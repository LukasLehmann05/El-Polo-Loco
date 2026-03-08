/**
 * @file throwable-object.class.js
 * @description Contains necessary handling for Object throwing.
 */
class Throwable_Object extends Moveable_object {
    speed = 7.5
    vertical_speed = 15
    throw_cooldown = 1
    throw_height = 5
    acceleration = -0.25
    base_y = 530
    last_throw = new Date().getTime()
    target_fps = 1000 / 60
    bottle_status = true
    bottle_hit = false
    visible = true
    statusbar = new StatusBar()

    BOTTLE_THROW_SEQUENCE = [
        "../img/salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "../img/salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "../img/salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "../img/salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ]

    BOTTLE_SPLASH_SEQUENCE = [
        "../img/salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "../img/salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "../img/salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "../img/salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "../img/salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "../img/salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ]

    /**
     * Class initialization.
     */
    constructor() {
        super().loadImage("../img/salsa_bottle/bottle_rotation/1_bottle_rotation.png")
        this.loadImages(this.BOTTLE_THROW_SEQUENCE)
        this.loadImages(this.BOTTLE_SPLASH_SEQUENCE)
    }

    /**
     * Checks if the throw cooldown has elapsed.
     * @return {boolean} True if the throw cooldown has not elapsed, false otherwise.
     */
    checkThrowCooldown() {
        let timepassed = new Date().getTime() - this.last_throw
        timepassed = timepassed / 1000
        return timepassed < this.throw_cooldown
    }

    /**
     * Throws the bottle.
     * @param {boolean} mirrorImage Indicates if the bottle moves left or right.
     * @param {number} pos_x The x position to throw the bottle from.
     * @param {number} pos_y The y position to throw the bottle from.
     */
    throwBottle(mirrorImage, pos_x, pos_y) {
        this.visible = true
        this.pos_x = pos_x + (mirrorImage ? 50 : 100)
        this.pos_y = pos_y + 150
        this.vertical_speed = -this.throw_height

        if (!mirrorImage) {
            this.moveRight(this.speed, this.target_fps)
        } else {
            this.moveLeft(this.speed, this.target_fps)
        }

        this.gravityBottle()
        this.animateThrow(this.BOTTLE_THROW_SEQUENCE)
    }

    /**
     * Animates the throwing animation.
     * @param {array} sequence contains all animation images.
     */
    animateThrow(sequence) {
        setInterval(() => {
            if (this.bottle_status) {
                this.playAnimation(sequence)
            }
        }, this.animationFPS)
    }

    /**
     * Animation the bottle splash.
     * @param {array} sequence contains all animation images.
     */
    animateSplash(sequence) {
        let counter = 0
        let splash = setInterval(() => {
            this.playAnimation(sequence)
            counter++
            if (counter >= sequence.length) {
                clearInterval(splash)
                this.visible = false
            }
        }, this.animationFPS)
    }
    /**
     * Moves the bottle to the right.
     * @param {number} speed speed of the bottle.
     * @param {number} target_fps fps at which the bottle will fly.
     */
    moveRight(speed, target_fps) {
        setInterval(() => {
            if (this.bottle_status) {
                this.pos_x += speed
            }
        }, target_fps)
    }

    /**
     * Moves the bottle to the left.
     * @param {*} speed speed of the bottle.
     * @param {*} target_fps fps at which the bottle will fly
     */
    moveLeft(speed, target_fps) {
        setInterval(() => {
            if (this.bottle_status) {
                this.pos_x -= speed
            }
        }, target_fps)
    }

    /**
     * Fires bottle splash animation, stops the bottle.
     */
    bottle_splash() {
        this.bottle_status = false
        this.speed = 0
        this.animateSplash(this.BOTTLE_SPLASH_SEQUENCE)
    }

}
