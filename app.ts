var engine: TSE.Engine;
// the main entry point to the application
window.onload = function () {
    engine = new TSE.Engine(); //initialize the engine variable and assigning it
    engine.start(); //start the engine

}

window.onresize = function () {
    engine.resize();
}