class Moveable_object extends DrawableObject {
    speed = 0.15
    animationFPS = 1000 / 6
    mirrorImage = false

    constructor() {
        super()
    }

    moveLeft(speed, target_fps) {
        setInterval(() => {
            this.pos_x -= speed
        }, target_fps)
    }

    animate(speed, target_fps, WALKING_SEQUENCE, animationFPS) {
        this.moveLeft(speed, target_fps)

        setInterval(() => {
            let i = this.currentImage % WALKING_SEQUENCE.length
            this.currentImage = i
            let path = WALKING_SEQUENCE[this.currentImage]
            this.img = this.imageCache[path]
            this.currentImage++

        }, animationFPS)
    }

    isColliding(objectToCheck) {
        return this.pos_x + this.width > objectToCheck.pos_x &&
            this.pos_y + this.height > objectToCheck.pos_y &&
            this.pos_x < objectToCheck.pos_x + objectToCheck.width &&
            this.pos_y < objectToCheck.pos_y + objectToCheck.height
    }
}