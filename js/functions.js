export function render() {
    let playerSize = $("#player_model").data("size") ?? 4;

    // Frontend rendering
    $("#player_size").html(playerSize * 0.25);

    const _size = playerSize * 0.25 + "rem";
    $("[data-size]").css({ width: _size, height: _size });
}
