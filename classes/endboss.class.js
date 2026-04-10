/**
 * @file endboss.class.js
 * @description Contains endboss data for the game to be displayed.
 */
class Endboss extends Moveable_object {
    pos_y = 170
    height = 500
    width = 350
    target_fps = 1000 / 60
    health = 5
    died = false
    playedAnimation = false
    world = undefined
    mirrorImage = false

    WALKING_SEQUENCE = [
        "../img/enemies/boss_chicken/1_walk/G1.png",
        "../img/enemies/boss_chicken/1_walk/G2.png",
        "../img/enemies/boss_chicken/1_walk/G3.png",
        "../img/enemies/boss_chicken/1_walk/G4.png",
    ]

    DIED_SEQUENCE = [
        "../img/enemies/boss_chicken/5_dead/G24.png",
        "../img/enemies/boss_chicken/5_dead/G25.png",
        "../img/enemies/boss_chicken/5_dead/G26.png",
    ]

    HURT_SEQUENCE = [
        "../img/enemies/boss_chicken/4_hurt/G21.png",
        "../img/enemies/boss_chicken/4_hurt/G22.png",
        "../img/enemies/boss_chicken/4_hurt/G23.png",
    ]

    ALERT_SEQUENCE = [
        "../img/enemies/boss_chicken/2_alert/G5.png",
        "../img/enemies/boss_chicken/2_alert/G6.png",
        "../img/enemies/boss_chicken/2_alert/G7.png",
        "../img/enemies/boss_chicken/2_alert/G8.png",
        "../img/enemies/boss_chicken/2_alert/G9.png",
        "../img/enemies/boss_chicken/2_alert/G10.png",
        "../img/enemies/boss_chicken/2_alert/G11.png",
        "../img/enemies/boss_chicken/2_alert/G12.png",
    ]



    /**
     * Class initialization.
     * @param {number} offset_x The initial x position offset of the endboss.
     */
    constructor(offset_x) {
        super().loadImage("../img/enemies/boss_chicken/1_walk/G1.png")
        this.pos_x = offset_x + Math.random() * 200
        this.speed = 2 + Math.random() * 0.35
        this.loadImages(this.WALKING_SEQUENCE)
        this.loadImages(this.DIED_SEQUENCE)
        this.loadImages(this.HURT_SEQUENCE)
        this.loadImages(this.ALERT_SEQUENCE)
    }

    moveEndboss(target_fps) {
        setInterval(() => {
            if (this.world.character.pos_x < this.pos_x) {
                this.mirrorImage = false
                this.pos_x -= this.speed
            } else {
                this.mirrorImage = true
                this.pos_x += this.speed
            }
        }, target_fps)
    }

    /**
     * Plays the endboss walking animation.
     */
    playEndbossAnimation() {
        this.moveEndboss(this.target_fps)
        setInterval(() => {
            if (!this.died) {
                this.playAnimation(this.WALKING_SEQUENCE)
            }
        }, this.animationFPS)
    }

    /**
     * Plays the endboss died animation.
     */
    playDiedAnimation() {
        let currentImage = 0
        let deadAnim = setInterval(() => {
            if (currentImage < this.DIED_SEQUENCE.length) {
                this.img = this.imageCache[this.DIED_SEQUENCE[currentImage]]
                currentImage++
            } else {
                clearInterval(deadAnim)
                this.pos_y = 400
            }
        }, this.animationFPS)
    }

    /**
     * Stops the enemy from moving and plays the died animation.
     */
    enemyKilled() {
        this.speed = 0
        this.died = true
        this.playDiedAnimation()
        playSound("../sounds/chicken_dead.mp3")
    }

    endbossTriggered() {
        this.playEndbossAnimation()
    }
}
