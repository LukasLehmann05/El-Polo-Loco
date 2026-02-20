class Throwable_Object extends Moveable_object {
    speed = 5
    vertical_speed = 15
    throw_cooldown = 1
    last_throw = new Date().getTime()
    target_fps = 1000 / 60

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

    constructor() {
        super().loadImage("../img/salsa_bottle/bottle_rotation/1_bottle_rotation.png")
        this.loadImages(this.BOTTLE_THROW_SEQUENCE)
        this.loadImages(this.BOTTLE_SPLASH_SEQUENCE)
    }

    checkThrowCooldown() {
        let timepassed = new Date().getTime() - this.last_throw
        timepassed = timepassed / 1000
        return timepassed < this.throw_cooldown
    }

    throwBottle(mirrorImage, pos_x, pos_y) {
        this.pos_x = pos_x
        this.pos_y = pos_y
        this.gravity()

        if (!mirrorImage) {
            this.animate(this.speed, this.target_fps, this.BOTTLE_THROW_SEQUENCE, this.animationFPS, "right")
        } else {
            this.animate(this.speed, this.target_fps, this.BOTTLE_THROW_SEQUENCE, this.animationFPS, "left")
        }

        this.throwAnimation()
    }

    throwAnimation() {

    }

}