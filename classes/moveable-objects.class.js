class Moveable_object {
    pos_x = 120
    pos_y = 500
    img
    height = 150
    width = 100
    speed = 0.15
    animationFPS = 1000/6
    mirrorImage = false

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

    moveLeft(speed,target_fps) {
        setInterval(() => {
            this.pos_x -= speed
        }, target_fps)
    }

    moveRight() {
        log('moving right')
    }

    animate(speed, target_fps, WALKING_SEQUENCE, animationFPS) {
        this.moveLeft(speed,target_fps)

        setInterval(() => {
            let i = this.currentImage % WALKING_SEQUENCE.length
            this.currentImage = i
            let path = WALKING_SEQUENCE[this.currentImage]
            this.img = this.imageCache[path]
            this.currentImage++

        },animationFPS)
    }
}