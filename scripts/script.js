let canvas = document.getElementById("game_canvas")
let world

let canvas_width = 1280
let canvas_height = 720

let controls = new Controls()

function init() {

    canvas.width = canvas_width
    canvas.height = canvas_height

    world = new World(canvas, controls)
}

window.addEventListener("keydown", (event) => {
    let key = event.code.replace("Key", "").toUpperCase()
    controls.handleKey(key, true)
})

window.addEventListener("keyup", (event) => {
    let key = event.code.replace("Key", "").toUpperCase()
    controls.handleKey(key, false)
})