class Chicken extends Moveable_object {

    pos_y = 520
    height = 125
    width = 100
    target_fps = 1000/60
    died = false

    WALKING_SEQUENCE = [
        "../img/enemies/chicken/chicken_normal/1_walk/1_w.png",
        "../img/enemies/chicken/chicken_normal/1_walk/2_w.png",
        "../img/enemies/chicken/chicken_normal/1_walk/3_w.png",
    ]

    dead_image = "../img/enemies/chicken/chicken_normal/2_dead/dead.png"

    constructor() {
        super().loadImage("../img/enemies/chicken/chicken_normal/1_walk/1_w.png")
        this.pos_x = 300 + Math.random() * 700
        this.speed = 2 + Math.random() * 0.35
        this.loadImages([this.dead_image])
        this.loadImages(this.WALKING_SEQUENCE)
        this.playChickenAnimation()
    }

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

    chickenDied() {
        this.speed = 0 
    }
}