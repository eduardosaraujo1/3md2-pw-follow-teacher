/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas#board");
const ctx = canvas.getContext("2d");

if (!canvas) {
    throw new Error("Canvas was not found");
}

function includesPos(array, pos) {
    for (const e of array) {
        if (e[0] == pos[0] && e[1] == pos[1]) {
            return true;
        }
    }

    return false;
}

/** @param {Array} board */
function draw(board) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const CELL_SIZE = 25;
    const BOARD_WIDTH = 100;
    const BOARD_HEIGHT = 100;

    for (let h = 0; h < BOARD_HEIGHT; h++) {
        for (let w = 0; w < BOARD_WIDTH; w++) {
            if (includesPos(board, [w, h])) {
                ctx.fillStyle = "yellow";
            } else {
                ctx.fillStyle = "gray";
            }
            ctx.fillRect(
                w * (CELL_SIZE + 1),
                h * (CELL_SIZE + 1),
                CELL_SIZE,
                CELL_SIZE
            );
        }
    }
}

export default {
    draw,
};
