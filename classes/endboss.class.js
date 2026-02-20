class Endboss extends Moveable_object {
    pos_y = 170
    height = 500
    width = 350
    target_fps = 1000/60

    WALKING_SEQUENCE = [
        "../img/enemies/boss_chicken/1_walk/G1.png",
        "../img/enemies/boss_chicken/1_walk/G2.png",
        "../img/enemies/boss_chicken/1_walk/G3.png",
        "../img/enemies/boss_chicken/1_walk/G4.png",
    ]

    constructor() {
        super().loadImage("../img/enemies/boss_chicken/1_walk/G1.png")
        this.pos_x = 300 + Math.random() * 700
        this.speed = 2 + Math.random() * 0.35
        this.loadImages(this.WALKING_SEQUENCE)
        this.animate(this.speed, this.target_fps, this.WALKING_SEQUENCE, this.animationFPS, "left")
    }
}