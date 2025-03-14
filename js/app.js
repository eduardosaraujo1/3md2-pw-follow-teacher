import "../lib/jquery.js";
import { render, player } from "./functions.js";

console.log("App started");

$(() => {
    // Button handling
    $("#player_size_plus").on("click", () => {
        player.setSize((size) => Math.min(size + 1, 64));

        render();
    });
    $("#player_size_minus").on("click", () => {
        player.setSize((size) => Math.max(size - 1, 4));

        render();
    });
    $("#board_reset").on("click", () => {
        player.setSize(() => 16);
        player.moveX(0);
        player.moveY(0);

        render();
    });

    $(window).on("keydown", (event) => {
        if (event.key === "ArrowRight" || event.key === "d") {
            player.moveX(1);
        } else if (event.key === "ArrowLeft" || event.key === "a") {
            player.moveX(-1);
        } else if (event.key === "ArrowUp" || event.key === "w") {
            player.moveY(-1);
        } else if (event.key === "ArrowDown" || event.key === "s") {
            player.moveY(1);
        }

        render();
    });

    render();
});
