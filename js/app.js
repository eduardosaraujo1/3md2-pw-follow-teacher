import "../lib/jquery.js";
import { render } from "./functions.js";

console.log("App started");

$(() => {
    let playerSize = $("#player_model").data("size") ?? 4;

    // Button handling
    $("#player_size_plus").on("click", () => {
        playerSize++;

        $("[data-size]").data("size", playerSize);
        render();
    });
    $("#player_size_minus").on("click", () => {
        playerSize--;

        $("[data-size]").data("size", playerSize);
        render();
    });

    render();
});
