import "../lib/jquery.js";
import { render } from "./functions.js";

console.log("App started");

$(() => {
    let playerSize = $("#player_model").data("size") ?? 4;

    // Button handling
    $("#player_size_plus").on("click", () => {
        playerSize = Math.min(playerSize + 1, 64);

        $("#player_model").data("size", playerSize);
        render();
    });
    $("#player_size_minus").on("click", () => {
        playerSize = Math.max(playerSize - 1, 2);

        $("#player_model").data("size", playerSize);
        render();
    });
    $("#board_reset").on("click", () => {
        playerSize = 16;

        $("#player_model").data("size", playerSize);
        render();
    });
    // TODO: create a custom setState function for state management (playerSize aquirement should be on render, not here)

    render();
});
