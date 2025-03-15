import "../lib/jquery.js";
import Game from "./game.js";

$(() => {
    const game = new Game({ defaultSize: 4, defaultSpeed: 16 });

    $("#board_reset").on("click", () => {
        game.reset();
    });

    // player size
    $("#player_size_plus").on("click", () => {
        game.player.addSize(0.5);

        game.refresh();
    });

    $("#player_size_minus").on("click", () => {
        game.player.addSize(-0.5);

        game.refresh();
    });

    // player speed
    $("#player_speed_plus").on("click", () => {
        game.player.addSpeed(1);

        game.refresh();
    });
    $("#player_speed_minus").on("click", () => {
        player.addSpeed(-1);

        game.refresh();
    });

    console.log("App started");
});
