import "./lib/jquery.js";

const STEP = 15;
let x = 0;
let y = 0;

function refreshPlayerPos(player) {
    const container = player.parent();
    if (!container) throw new Error("player container not found");

    const maxPlayerX = container.width() - player.width();
    const maxPlayerY = container.height() - player.height();

    x = Math.min(Math.max(0, x), maxPlayerX);
    y = Math.min(Math.max(0, y), maxPlayerY);

    player.animate(
        {
            left: x + "px",
            top: y + "px",
        },
        5
    );
}

function handleKeyPress(key) {
    const player = $("#player");

    if (["ArrowUp", "w", "W"].includes(key)) {
        y -= STEP;
    } else if (["ArrowDown", "s", "S"].includes(key)) {
        y += STEP;
    } else if (["ArrowRight", "d", "D"].includes(key)) {
        x += STEP;
    } else if (["ArrowLeft", "a", "A"].includes(key)) {
        x -= STEP;
    }

    refreshPlayerPos(player);
}

$(() => {
    let mouseLoop;
    $("[data-key]").on("mousedown", (event) => {
        mouseLoop = setInterval(() => {
            const key = event.target.dataset.key;
            handleKeyPress(key);
        }, 100);
    });

    $("[data-key]").on("mouseup", () => {
        clearInterval(mouseLoop);
    });

    $(document).on("keydown", (event) => {
        const key = event.key;
        handleKeyPress(key);
    });
});
