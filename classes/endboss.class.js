class Endboss extends Moveable_object {
    pos_y = 170
    height = 500
    width = 350
    target_fps = 1000/60
    health = 5
    died = false
    playedAnimation = false

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



    constructor() {
        super().loadImage("../img/enemies/boss_chicken/1_walk/G1.png")
        this.pos_x = 300 + Math.random() * 700
        this.speed = 2 + Math.random() * 0.35
        this.loadImages(this.WALKING_SEQUENCE)
        this.loadImages(this.DIED_SEQUENCE)
        this.playEndbossAnimation()
    }

    playEndbossAnimation() {
        this.moveLeft(this.target_fps)
        setInterval(() => {
            if (!this.died) {
                this.playAnimation(this.WALKING_SEQUENCE)
            }
        }, this.animationFPS)
    }

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

    endbossDied() {
        this.speed = 0
        this.died = true
        this.playDiedAnimation()
    }
}