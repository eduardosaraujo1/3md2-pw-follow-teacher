export function render() {
    $("[data-size]").each((_, e) => {
        let _size;
        _size = $(e).data("size") * 0.25;
        _size += "rem";

        $(e).css({ width: _size, height: _size });
    });

    const playerSize = ($("#player_model").data("size") ?? 4) * 0.25;
    $("#player_size").html(playerSize);
}
