const canvas_width = 1280
const canvas_height = 720

let canvas = document.getElementById("game_canvas")
let game_wrapper = document.getElementById("game_wrapper")
let fullscreen_icon = document.getElementById("fullscreen_icon")
let fullscreen = false
let world

let controls = new Controls()
let throwableObject = new Throwable_Object()

function init() {

    canvas.width = canvas_width
    canvas.height = canvas_height

    world = new World(canvas, controls, throwableObject)
}

window.addEventListener("keydown", (event) => {
    let key = event.code.replace("Key", "").toUpperCase()
    controls.handleKey(key, true)
})

window.addEventListener("keyup", (event) => {
    let key = event.code.replace("Key", "").toUpperCase()
    controls.handleKey(key, false)
})

function loadLevels() {
    world.startGame()
    loadLevel1(world)
}

function showFullscreen(event) {
    event.stopPropagation()
    if (!fullscreen) {
        game_wrapper.requestFullscreen()
        fullscreen = true
        fullscreen_icon.src = "./img/controls/close_fullscreen.png"
    } else {
        document.exitFullscreen()
        fullscreen = false
        fullscreen_icon.src = "./img/controls/open_fullscreen.png"
    }
}

