const REM_IN_PX = parseFloat(
    getComputedStyle(document.documentElement).fontSize
);

export function render() {
    // generic size argument
    $("[data-size]").each((_, e) => {
        let _size;
        _size = $(e).data("size");
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
    const playerSize = player.size();
    $("#player_size").html(playerSize);

    // player speed display
    const playerSpeed = player.speed();
    $("#player_speed").html(playerSpeed);

    console.log("Re-render");
}

function clampPositionX(pos = 0) {
    let minX = 0;
    let maxX = $("#game").width() - player.size() * REM_IN_PX;

    return Math.min(Math.max(pos, minX), maxX);
}

function clampPositionY(pos = 0) {
    let minY = 0;
    let maxY = $("#game").height() - player.size() * REM_IN_PX;

    return Math.min(Math.max(pos, minY), maxY);
}

export const player = {
    model: () => {
        return $("#player_model");
    },
    size: () => {
        return player.model().data("size") ?? 4;
    },
    /** @param {number} size */
    setSize: (size) => {
        const MIN_SIZE = 1;
        const MAX_SIZE = 16;

        size = Math.max(Math.min(parseFloat(size), MAX_SIZE), MIN_SIZE);
        player.model().data("size", size);
    },
    /** @param {number} size */
    addSize: (size) => {
        size = player.size() + parseFloat(size);

        player.setSize(size);
    },
    x: () => {
        return player.model().data("x") ?? 0;
    },
    /** @param {number} x */
    setX: (x) => {
        player.model().data("x", clampPositionX(x));
    },
    /** @param {number} x */
    addX: (x) => {
        x = x * player.speed() + player.x();

        player.setX(x);
    },
    y: () => {
        return player.model().data("y") ?? 0;
    },
    /** @param {number} y */
    setY: (y) => {
        player.model().data("y", clampPositionY(y));
    },
    /**
     * @param {number} y
     */
    addY: (y) => {
        y = y * player.speed() + player.y();

        player.setY(y);
    },
    speed: () => {
        return player.model().data("speed") ?? 8;
    },
    /** @param {number} speed */
    setSpeed: (speed) => {
        player.model().data("speed", speed);
    },
    /** @param {number} speed */
    addSpeed: (speed) => {
        speed = player.speed() + parseInt(speed);

        player.setSpeed(speed);
    },
};
