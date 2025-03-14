import "../lib/jquery.js";
import { render, player } from "./functions.js";

console.log("App started");

$(() => {
    // Player size
    $("#player_size_plus").on("click", () => {
        player.addSize(0.5);

        render();
    });
    $("#player_size_minus").on("click", () => {
        player.addSize(-0.5);

        render();
    });
    $("#board_reset").on("click", () => {
        player.setSize(4);
        player.setX(0);
        player.setY(0);
        player.setSpeed(8);

        render();
    });

    // Player Speed
    $("#player_speed_plus").on("click", () => {
        player.addSpeed(1);

        render();
    });
    $("#player_speed_minus").on("click", () => {
        player.addSpeed(-1);

        render();
    });

    // Movement
    $(window).on("keydown", (event) => {
        if (event.key === "ArrowRight" || event.key === "d") {
            player.addX(1);
        } else if (event.key === "ArrowLeft" || event.key === "a") {
            player.addX(-1);
        } else if (event.key === "ArrowUp" || event.key === "w") {
            player.addY(-1);
        } else if (event.key === "ArrowDown" || event.key === "s") {
            player.addY(1);
        }

        render();
    });

    render();
});
