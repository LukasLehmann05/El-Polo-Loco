class Throwable_Object extends Moveable_object {
    speed = 7.5
    vertical_speed = 15
    throw_cooldown = 1
    throw_height = 5
    acceleration = -0.25
    base_y = 530
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
        this.pos_x = pos_x + (mirrorImage ? 50 : 100)
        this.pos_y = pos_y + 150
        this.vertical_speed = -this.throw_height
        this.gravityBottle()

        if (!mirrorImage) {
            this.animate(this.speed, this.target_fps, this.BOTTLE_THROW_SEQUENCE, this.animationFPS, "right")
        } else {
            this.animate(this.speed, this.target_fps, this.BOTTLE_THROW_SEQUENCE, this.animationFPS, "left")
        }
    }

}