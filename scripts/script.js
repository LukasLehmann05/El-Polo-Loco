let canvas = document.getElementById("game_canvas")
let character = new Moveable_object()
let ctx

function init() {
    character.src = "../img/pepe/1_idle/idle/I-1.png"
    ctx = canvas.getContext("2d")

    
}