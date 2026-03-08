class SmallChicken extends Moveable_object {

    pos_y = 545
    height = 100
    width = 80
    target_fps = 1000/60
    died = false
    health = 1

    WALKING_SEQUENCE = [
        "../img/enemies/chicken/chicken_small/1_walk/1_w.png",
        "../img/enemies/chicken/chicken_small/1_walk/2_w.png",
        "../img/enemies/chicken/chicken_small/1_walk/3_w.png",
    ]

    dead_image = "../img/enemies/chicken/chicken_small/2_dead/dead.png"

    constructor(offset_x) {
        super().loadImage("../img/enemies/chicken/chicken_small/1_walk/1_w.png")
        this.pos_x = offset_x + Math.random() * 200
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

    enemyKilled() {
        this.speed = 0
        playSound("../sounds/chicken_dead.mp3")
    }
}