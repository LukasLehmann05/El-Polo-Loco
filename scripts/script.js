const canvas_width = 1280
const canvas_height = 720

let canvas = document.getElementById("game_canvas")
let game_wrapper = document.getElementById("game_wrapper")
let fullscreen_icon = document.getElementById("fullscreen_icon")
let fullscreen = false
let world
let game_running = false
let volume = 0.5
let mute = false

let controls = new Controls()
let throwableObject = new Throwable_Object()

let sound_coin_pickup = "./sounds/coin_pickup.wav"
let sound_game_lost = "./sounds/lost_sound.wav"
let sound_game_won = "./sounds/victory_sound.wav"
let sound_pickup = "./sounds/pickup_sound.wav"

function init() {
    canvas.width = canvas_width
    canvas.height = canvas_height

    world = new World(canvas, controls, throwableObject)

    let stored_mute = getFromLocalStorage("mute")
    let stored_volume = getFromLocalStorage("volume")
    setSoundFromStorage(stored_mute, stored_volume)

    checkForMobile()
    checkOrientation()
}

function setSoundFromStorage(stored_mute, stored_volume) {
    if (stored_mute !== null) {
        mute = stored_mute === "true"
        changeMuteIcon()
    }

    if (stored_volume !== null) {
        volume = parseFloat(stored_volume)
        document.getElementById("volume_slider").value = volume * 100
    }
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
    document.getElementById("start_button").style.display = "none"
    if (!game_running) {
        world.startGame()
        loadLevel1(world)
        loadLevel2(world)
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
    let menu_button = document.getElementById("menu_button")
    
    if (restart_button.classList.contains("display-block")) {
        restart_button.classList.remove("display-block")
        menu_button.classList.remove("display-block")
    } else {
        restart_button.classList.add("display-block")
        menu_button.classList.add("display-block")
    }
}

function clearOldWorld() {
    game_running = false
}

function restartGame(event) {
    displayRestartButton()
    event.stopPropagation()
    clearOldWorld()
    world = new World(canvas, controls, throwableObject)
    loadLevels()
}

function showMenu(event) {
    event.stopPropagation()
    displayRestartButton()
    document.getElementById("start_button").style.display = "block"
    world.game_started = false
    world.game_ended = false
    world.display_endscreen = false
    clearOldWorld()
}

function changeVolume(event) {
    event.stopPropagation()
    let input_volume = document.getElementById("volume_slider").value
    volume = input_volume / 100
    addToLocalStorage("volume", volume)

    if (input_volume == 0) {
        mute = true
        changeMuteIcon()
    } else {
        mute = false
        changeMuteIcon()
    }
}

function playSound(url) {
    if (!mute) {
        let audio = new Audio(url)
        audio.volume = volume
        audio.play()
    }
}

function toggleMute(event) {
    event.stopPropagation()
    mute = !mute
    changeMuteIcon()

    let input_volume = document.getElementById("volume_slider").value
    addToLocalStorage("mute", mute)

    if (!mute && input_volume == 0) {
        document.getElementById("volume_slider").value = 25
        changeVolume(event)
    }
}

function changeMuteIcon() {
    let mute_icon = document.getElementById("mute_icon")

    if (mute) {
        mute_icon.src = "./img/controls/volume_off.png"
    } else {
        mute_icon.src = "./img/controls/volume_on.png"
    }
}

function addToLocalStorage(key, value) {
    localStorage.setItem(key, value)
}

function getFromLocalStorage(key) {
    return localStorage.getItem(key)
}

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function checkForMobile() {
    if (isMobile()) {
        world.isPhone = true
    } else {
        world.isPhone = false
    }
}

function handleMobileControl(key, isPressed) {
    world.controls.handleKey(key, isPressed)
}

function disableContext(event) {
    event.stopPropagation()
    event.preventDefault()
}

function checkOrientation() {
    if (screen.orientation.angle === 90 || screen.orientation.angle === -90 || window.innerWidth > 600) {
        document.getElementById("turn_info").style.display = "none"
    } else if ((screen.orientation.angle === 0 || screen.orientation.angle === 180) && window.innerWidth <= 600) {
        document.getElementById("turn_info").style.display = "flex"
    }

}

screen.orientation.addEventListener("change", () => {
    checkOrientation()
})