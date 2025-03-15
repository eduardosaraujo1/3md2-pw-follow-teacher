import "../lib/jquery.js";
import Player from "./player.js";
import BlockManager from "./block-manager.js";

export default class Game {
    constructor({ defaultSize, defaultSpeed }) {
        // define default values
        this.defaultSize = defaultSize;
        this.defaultSpeed = defaultSpeed;

        // instantiate player
        this.player = new Player({
            game: this,
            size: defaultSize,
            speed: defaultSpeed,
        });
        this.blockManager = new BlockManager(this);

        this.reset();
    }

    refresh() {
        // check if the player is colliding with another block
        const collidingBlock = this.player.getCollidingBlock();
        if (collidingBlock) {
            if (this.player.size() < collidingBlock.data("size") ?? 0) {
                this.player.remove();
            } else {
                this.blockManager.remove(collidingBlock);
            }
        }

        // apply styles to all elements with specific data
        $("[data-size]").each((_, e) => {
            let _size;
            _size = $(e).data("size");
            _size += "rem";

            $(e).css({ width: _size, height: _size });
        });

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

        this.player.model().css("display", "block");

        $("[data-removed]").each((_, e) => {
            $(e).css({ display: "none" });
        });

        // update display
        $("#player_size").html(this.player.size());
        $("#player_speed").html(this.player.speed());
    }

    reset() {
        const player = this.player;

        player.setSize(this.defaultSize);
        player.setSpeed(this.defaultSpeed);
        player.setX(0);
        player.setY(0);
        player.model().get()[0].removeAttribute("data-removed");

        this.blockManager.clear();

        this.blockManager.spawnRandomBlock();
        this.blockManager.spawnRandomBlock();
        this.blockManager.spawnRandomBlock();
        this.blockManager.spawnRandomBlock();

        this.refresh();
    }
}
