export function render() {
    // generic size argument
    $("[data-size]").each((_, e) => {
        let _size;
        _size = $(e).data("size") * 0.25;
        _size += "rem";

        $(e).css({ width: _size, height: _size });
    });

    // generic positions
    $("[data-x]").each((_, e) => {
        let _pos;
        _pos = $(e).data("x");
        _pos += "px";

        $(e).css({ left: _pos });
    });

    $("[data-y]").each((_, e) => {
        let _pos;
        _pos = $(e).data("y");
        _pos += "px";

        $(e).css({ top: _pos });
    });

    // player size display
    const playerSize = player.size() * 0.25; // 0.25 converts the tailwind value into REM
    $("#player_size").html(playerSize);

    console.log("Re-render");
}

function clampPositionX(pos = 0) {
    let minX = 0;
    let maxX = $("#game").width() - player.size() * 4; // because the value is the tailwind syntax, which is based on REM * 0.25

    return Math.min(Math.max(pos, minX), maxX);
}

function clampPositionY(pos = 0) {
    let minY = 0;
    let maxY = $("#game").height() - player.size() * 4;

    return Math.min(Math.max(pos, minY), maxY);
}

export const player = {
    model: () => $("#player_model"),
    size: () => {
        return player.model().data("size") ?? 16;
    },
    /** @param {Function} callback */
    setSize: (callback) => {
        player.model().data("size", parseInt(callback(player.size())));
    },
    speed: 8,
    x: () => {
        return player.model().data("x") ?? 0;
    },
    y: () => {
        return player.model().data("y") ?? 0;
    },
    /**
     * @param {number} x
     * @param {number} y
     */
    moveX: (x) => {
        let moveCount;
        moveCount = x * player.speed + player.x();
        moveCount = clampPositionX(moveCount);

        player.model().data("x", moveCount);
    },
    moveY: (y) => {
        let moveCount;
        moveCount = y * player.speed + player.y();
        moveCount = clampPositionY(moveCount);

        player.model().data("y", moveCount);
    },
};
