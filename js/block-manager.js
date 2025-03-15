import { randInt, REM_IN_PX } from "./functions.js";
import Game from "./game.js";

export default class BlockManager {
    /**
     * @param {Game} game
     */
    constructor(game) {
        /**
         * @type {Array<JQuery<HTMLElement>>}
         */
        this.blocks = [];
        this.game = game;
    }

    clear() {
        for (const element of this.blocks) {
            element.remove();
        }
        this.blocks = [];
    }

    /** @param {JQuery<HTMLElement>} element */
    add(element) {
        $("#game").append(element);
        this.blocks.push(element);
    }

    /** @param {JQuery<HTMLElement>} element */
    remove(element) {
        let arr = [];
        for (const e of this.blocks) {
            if (!e.is(element)) {
                arr.push(e);
            }
        }
        this.blocks = arr;

        element.remove();
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} size
     */
    spawnBlock(x, y, size) {
        const element = $("<div>", {
            class: "absolute bg-red-500",
            "data-size": size,
            "data-x": x,
            "data-y": y,
        });

        this.add(element);

        this.game.refresh();
    }

    spawnRandomBlock() {
        const size = randInt(1, 16);
        const maxX = $("#game").width() - size * REM_IN_PX;
        const maxY = $("#game").height() - size * REM_IN_PX;

        const clampX = (x) => {
            return Math.min(Math.max(x, 0), maxX);
        };
        const clampY = (y) => {
            return Math.min(Math.max(y, 0), maxY);
        };

        let x;
        let y;
        do {
            // this is to prevent a newly spawned block from colliding with anything else
            x = clampX(randInt(0, maxX));
            y = clampY(randInt(0, maxY));
        } while (false);

        this.spawnBlock(x, y, size);
    }
}
