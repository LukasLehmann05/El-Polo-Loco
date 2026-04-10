/**
 * @file moveable-objects.class.js
 * @description Provides main function for all moveable objects in the game.
 */
class Moveable_object extends DrawableObject {
    speed = 0.15
    animationFPS = 1000 / 6
    mirrorImage = false

    /**
     * Class initialization.
     */
    constructor() {
        super()
    }

    /**
     * Moves the object to the left.
     * @param {*} target_fps
     */
    moveLeft(target_fps) {
        setInterval(() => {
            this.pos_x -= this.speed
        }, target_fps)
    }

    /**
     * Plays the animation sequence.
     * @param {Array<string>} sequence contains all image paths of the animation.
     */
    playAnimation(sequence) {
        let i = this.currentImage % sequence.length
        this.currentImage = i
        let path = sequence[this.currentImage]
        this.img = this.imageCache[path]
        this.currentImage++
    }

    /**
     * Adds gravity to each moveable object.
     */
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

    /**
     * Adds gravity to the bottle.
     */
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

    /**
     * Checks if the object is colliding with another object.
     * @param {class} objectToCheck the object to check for collision.
      * @returns {boolean} true if colliding, false if not.
     */
    isColliding(objectToCheck) {
        return (this.pos_x - this.col_offset_x) + this.width > (objectToCheck.pos_x + objectToCheck.col_offset_x) &&
            (this.pos_y - this.col_offset_y) + this.height > (objectToCheck.pos_y + objectToCheck.col_offset_y) &&
            (this.pos_x + this.col_offset_x) < (objectToCheck.pos_x - objectToCheck.col_offset_x) + objectToCheck.width &&
            (this.pos_y + this.col_offset_y) < (objectToCheck.pos_y - objectToCheck.col_offset_y) + objectToCheck.height
    }
}
