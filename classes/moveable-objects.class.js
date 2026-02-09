class Moveable_object {
    pos_x = 120
    pos_y = 500
    img
    height = 150
    width = 100

    currentImage = 0

    imageCache = {}

    constructor() {
        
    }

    loadImage(path) {
        this.img = new Image()
        this.img.src = path
    }

    loadImages(img_array) {
        img_array.forEach((path) => {
            let img = new Image()
            img.src = path
            this.imageCache[path] = img
        })
    }

    moveLeft() {
        log('moving left')
    }

    moveRight() {
        log('moving right')
    }
}