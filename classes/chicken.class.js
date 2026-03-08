/**
 * @file chicken.class.js
 * @description Contains chicken enemy data for the game to be displayed.
 */
class Chicken extends Moveable_object {

    pos_y = 520
    height = 125
    width = 100
    target_fps = 1000/60
    died = false
    health = 1

    WALKING_SEQUENCE = [
        "../img/enemies/chicken/chicken_normal/1_walk/1_w.png",
        "../img/enemies/chicken/chicken_normal/1_walk/2_w.png",
        "../img/enemies/chicken/chicken_normal/1_walk/3_w.png",
    ]

    dead_image = "../img/enemies/chicken/chicken_normal/2_dead/dead.png"

    /**
     * Class initialization.
     * @param {*} offset_x
     */
    constructor(offset_x) {
        super().loadImage("../img/enemies/chicken/chicken_normal/1_walk/1_w.png")
        this.pos_x = offset_x + Math.random() * 200
        this.speed = 2 + Math.random() * 0.35
        this.loadImages([this.dead_image])
        this.loadImages(this.WALKING_SEQUENCE)
        this.playChickenAnimation()
    }

    /**
     * Plays the chicken walking animation.
     */
    playChickenAnimation() {
        this.moveLeft(this.target_fps)
        setInterval(() => {
            if (!this.died) {
                this.playAnimation(this.WALKING_SEQUENCE)
            } else {
                this.img = this.imageCache[this.dead_image]
            }
        }, this.animationFPS)
    }

    /**
     * Stops the enemy from moving and plays the died animation.
     */
    enemyKilled() {
        this.speed = 0
        this.died = true
        playSound("../sounds/chicken_dead.mp3")
    }
}
