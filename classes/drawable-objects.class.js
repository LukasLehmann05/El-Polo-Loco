class DrawableObject{
    pos_x = 120
    pos_y = 500
    img
    height = 150
    width = 100
    currentImage = 0

    imageCache = {}

    damage = 20
    health = 100
    coins = 0
    bottles = 0

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

}