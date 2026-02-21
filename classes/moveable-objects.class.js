class Moveable_object extends DrawableObject {
    speed = 0.15
    animationFPS = 1000 / 6
    mirrorImage = false

    constructor() {
        super()
    }

    moveLeft(target_fps) {
        setInterval(() => {
            this.pos_x -= this.speed
        }, target_fps)
    }

    playAnimation(sequence) {
        let i = this.currentImage % sequence.length
        this.currentImage = i
        let path = sequence[this.currentImage]
        this.img = this.imageCache[path]
        this.currentImage++
    }

    gravity() {
        setInterval(() => {
            if (!this.vertical_speed == 0 || this.pos_y < this.character_base_y) {
                this.pos_y += this.vertical_speed
                this.vertical_speed -= this.acceleration
            }

            if (this.pos_y > this.character_base_y) {
                this.pos_y = this.character_base_y
                this.vertical_speed = 0
            }
        }, 1000 / 60)
    }

    gravityBottle() {
        setInterval(() => {
            if (!this.vertical_speed == 0 || this.pos_y < this.base_y) {
                this.pos_y += this.vertical_speed
                this.vertical_speed -= this.acceleration
            }

            if (this.pos_y > this.base_y) {
                this.pos_y = this.base_y
                this.vertical_speed = 0
                this.bottle_splash()
            }
        }, 1000 / 60)
    }

    isColliding(objectToCheck) {
        return this.pos_x + this.width > objectToCheck.pos_x &&
            this.pos_y + this.height > objectToCheck.pos_y &&
            this.pos_x < objectToCheck.pos_x + objectToCheck.width &&
            this.pos_y < objectToCheck.pos_y + objectToCheck.height
    }
}