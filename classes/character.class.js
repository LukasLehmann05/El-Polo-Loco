class Character extends Moveable_object {

    height = 400
    width = 250
    pos_y = 260
    speed = 10
    character_offet_right = 200
    limit_left = -1080
    limit_right = 1480

    WALKING_SEQUENCE = [
        "../img/pepe/2_walk/W-21.png",
        "../img/pepe/2_walk/W-22.png",
        "../img/pepe/2_walk/W-23.png",
        "../img/pepe/2_walk/W-24.png",
        "../img/pepe/2_walk/W-25.png",
        "../img/pepe/2_walk/W-26.png",
    ]

    constructor() {
        super().loadImage("../img/pepe/1_idle/idle/I-1.png")
        this.loadImages(this.WALKING_SEQUENCE)
    }

    animate() {
        setInterval(() => {
                if (this.world.controls.MOVE_LEFT || this.world.controls.MOVE_RIGHT) {
                    this.moveAnimation()
                }
        }, 1000 / 20)

        setInterval(() => {
            this.moveCharacter()
        }, 1000 / 60)
    }

    moveCharacter() {
            if (this.world.controls.MOVE_LEFT && this.pos_x > this.limit_left) {
                this.pos_x -= this.speed
                this.mirrorImage = true
            } else if (this.world.controls.MOVE_RIGHT && this.pos_x < this.limit_right) {
                this.pos_x += this.speed
                this.mirrorImage = false
            }
            this.world.camera_x = -this.pos_x + this.character_offet_right
    }

    moveAnimation() {
        let i = this.currentImage % this.WALKING_SEQUENCE.length
        this.currentImage = i
        let path = this.WALKING_SEQUENCE[this.currentImage]
        this.img = this.imageCache[path]
        this.currentImage++
    }

    jump() {

    }
}