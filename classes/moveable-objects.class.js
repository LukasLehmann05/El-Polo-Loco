class Moveable_object {
    pos_x = 120
    pos_y = 500
    img

    height = 150
    width = 100

    constructor() {
        
    }

    loadImage(path) {
        this.img = new Image()
        this.img.src = path
    }

    moveLeft() {
        log('moving left')
    }

    moveRight() {
        log('moving right')
    }
}