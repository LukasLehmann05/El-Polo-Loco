let canvas = document.getElementById("game_canvas")
let world

let canvas_width = 1280
let canvas_height = 720

function init() {

    canvas.width = canvas_width
    canvas.height = canvas_height

    world = new World(canvas)

    
}