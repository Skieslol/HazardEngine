window.onload = (() => {
    let engine = new HZD.Engine();
    engine.start();
});

window.onresize = function() {
    let engine = new HZD.Engine();
    engine.resize();
}