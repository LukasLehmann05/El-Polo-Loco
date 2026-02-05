let canvas = document.getElementById("game_canvas")
let world

function init() {

    canvas.width = 1280
    canvas.height = 720

    world = new World(canvas)

    
}