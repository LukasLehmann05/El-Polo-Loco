class Moveable_object {
    pos_x = 10
    pos_y = 10
    img

    height = 50
    width = 50

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