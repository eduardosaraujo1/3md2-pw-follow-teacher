import './lib/jquery.js'

$(() => {
    $("button").on('click', () => {
        $("#subject").animate({
        top: "250px",
        left: "+=250px",
        width: "2rem",
        height: "2rem",
        });
    });
});