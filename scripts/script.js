const canvas_width = 1280
const canvas_height = 720

let canvas = document.getElementById("game_canvas")
let world

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