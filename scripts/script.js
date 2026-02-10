let canvas = document.getElementById("game_canvas")
let world

let canvas_width = 1280
let canvas_height = 720

let controls = new Controls()

function init() {

    canvas.width = canvas_width
    canvas.height = canvas_height

    world = new World(canvas)
}

window.addEventListener("keydown", (event) => {
    let key = event.key.toUpperCase()
    new Controls(key, true)
})

window.addEventListener("keyup", (event) => {
    let key = event.key.toUpperCase()
    new Controls(key, false)
})