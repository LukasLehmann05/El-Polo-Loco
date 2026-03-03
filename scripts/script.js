const canvas_width = 1280
const canvas_height = 720

let canvas = document.getElementById("game_canvas")
let game_wrapper = document.getElementById("game_wrapper")
let fullscreen_icon = document.getElementById("fullscreen_icon")
let fullscreen = false
let world
let game_running = false

let controls = new Controls()
let throwableObject = new Throwable_Object()

function init() {

    canvas.width = canvas_width
    canvas.height = canvas_height

    world = new World(canvas, controls, throwableObject)
}

window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault()
    }
    let key = event.code.replace("Key", "").toUpperCase()
    controls.handleKey(key, true)
})

window.addEventListener("keyup", (event) => {
    let key = event.code.replace("Key", "").toUpperCase()
    if (key === "SPACE") {
        event.preventDefault()
    }
    controls.handleKey(key, false)
})

function loadLevels() {
    if (!game_running) {
        world.startGame()
        loadLevel1(world)
        game_running = true
    }
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

function displayRestartButton() {
    let restart_button = document.getElementById("restart_button")
    if (restart_button.classList.contains("display-block")) {
        restart_button.classList.remove("display-block")
    } else {
        restart_button.classList.add("display-block")
    }
}

function clearOldWorld() {
    console.log("clear");
    game_running = false
}

function restartGame(event) {
    displayRestartButton()
    event.stopPropagation()
    clearOldWorld()
    world = new World(canvas, controls, throwableObject)
    loadLevels()
}

