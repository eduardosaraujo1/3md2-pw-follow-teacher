import "../lib/jquery.js";
import { REM_IN_PX } from "./functions.js";
import Game from "./game.js";

export default class Player {
    /**
     *
     * @param {Object} obj
     * @param {Game} obj.game
     * @param {number} obj.size
     * @param {number} obj.speed
     */
    constructor({ game, size, speed }) {
        const model = this.model();

        model.data("size", size);
        model.data("speed", speed);

        this.game = game;
        this.defaultSize = size;
        this.defaultSpeed = speed;

        this._loadMovementListeners();
    }

    _loadMovementListeners() {
        $(window).on("keydown", (event) => {
            if (this.model().get()[0].dataset.removed) {
                return;
            }
            if (event.key === "ArrowRight" || event.key === "d") {
                this.addX(1);
            } else if (event.key === "ArrowLeft" || event.key === "a") {
                this.addX(-1);
            } else if (event.key === "ArrowUp" || event.key === "w") {
                this.addY(-1);
            } else if (event.key === "ArrowDown" || event.key === "s") {
                this.addY(1);
            }

            this.game.refresh();
        });
    }

    remove() {
        console.log("Player Removed");
        this.model().get()[0].dataset.removed = "true";
    }

    getCollidingBlock() {
        const playerX = this.x();
        const playerY = this.y();
        const playerSize = this.size() * REM_IN_PX;

        for (const block of this.game.blockManager.blocks) {
            const x = block.data("x") ?? 0;
            const y = block.data("y") ?? 0;
            const size = (block.data("size") ?? 0) * REM_IN_PX;

            if (
                playerX < x + size &&
                playerX + playerSize > x &&
                playerY < y + size &&
                playerY + playerSize > y
            ) {
                return block;
            }
        }

        return null;
    }

    model() {
        return $("#player_model");
    }

    // GETTERS
    size() {
        return this.model().data("size") ?? this.game.defaultSize;
    }

    x() {
        return this.model().data("x") ?? 0;
    }

    y() {
        return this.model().data("y") ?? 0;
    }

    speed() {
        return this.model().data("speed") ?? this.game.defaultSpeed;
    }
    // END GETTERS

    // SETTERS
    /** @param {number} size */
    setSize(size) {
        const MIN_SIZE = 1;
        const MAX_SIZE = 16;

        size = Math.max(Math.min(parseFloat(size), MAX_SIZE), MIN_SIZE);
        this.model().data("size", size);
    }

    /** @param {number} x */
    setX(x) {
        this.model().data("x", this.clampX(x));
    }

    /** @param {number} y */
    setY(y) {
        this.model().data("y", this.clampY(y));
    }

    /** @param {number} speed */
    setSpeed(speed) {
        this.model().data("speed", speed);
    }
    // END SETTERS

    // ADDERS
    /** @param {number} size */
    addSize(size) {
        size = this.size() + parseFloat(size);

        this.setSize(size);
    }
    /** @param {number} x */
    addX(x) {
        x = x * this.speed() + this.x();

        this.setX(x);
    }

    /**
     * @param {number} y
     */
    addY(y) {
        y = y * this.speed() + this.y();

        this.setY(y);
    }

    /** @param {number} speed */
    addSpeed(speed) {
        speed = this.speed() + parseInt(speed);

        this.setSpeed(speed);
    }
    // END ADDERS

    clampX(pos) {
        const minX = 0;
        const maxX = $("#game").width() - this.size() * REM_IN_PX;

        return Math.min(Math.max(pos, minX), maxX);
    }

    clampY(pos) {
        const minY = 0;
        const maxY = $("#game").height() - this.size() * REM_IN_PX;

        return Math.min(Math.max(pos, minY), maxY);
    }
}
