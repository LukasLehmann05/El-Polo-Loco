class Character extends Moveable_object {

    height = 400
    width = 250
    pos_y = 260
    speed = 10
    character_offet_right = 200
    limit_left = -1080
    limit_right = 1480
    character_base_y = 260

    acceleration = -0.5
    jump_speed = 15
    vertical_speed = 0

    died = false

    WALKING_SEQUENCE = [
        "../img/pepe/2_walk/W-21.png",
        "../img/pepe/2_walk/W-22.png",
        "../img/pepe/2_walk/W-23.png",
        "../img/pepe/2_walk/W-24.png",
        "../img/pepe/2_walk/W-25.png",
        "../img/pepe/2_walk/W-26.png",
    ]

    JUMPING_SEQUENCE = [
        "../img/pepe/3_jump/J-31.png",
        "../img/pepe/3_jump/J-32.png",
        "../img/pepe/3_jump/J-33.png",
        "../img/pepe/3_jump/J-34.png",
        "../img/pepe/3_jump/J-35.png",
        "../img/pepe/3_jump/J-36.png",
        "../img/pepe/3_jump/J-37.png",
        "../img/pepe/3_jump/J-38.png",
        "../img/pepe/3_jump/J-39.png",
    ]

    DIED_SEQUENCE = [
        "../img/pepe/5_dead/D-51.png",
        "../img/pepe/5_dead/D-52.png",
        "../img/pepe/5_dead/D-53.png",
        "../img/pepe/5_dead/D-54.png",
        "../img/pepe/5_dead/D-55.png",
        "../img/pepe/5_dead/D-56.png",
        "../img/pepe/5_dead/D-57.png",
    ]

    HURT_SEQUENCE = [
        "../img/pepe/4_hurt/H-41.png",
        "../img/pepe/4_hurt/H-42.png",
        "../img/pepe/4_hurt/H-43.png",
    ]

    constructor() {
        super().loadImage("../img/pepe/1_idle/idle/I-1.png")
        this.loadImages(this.WALKING_SEQUENCE)
        this.loadImages(this.JUMPING_SEQUENCE)
        this.loadImages(this.DIED_SEQUENCE)
        this.loadImages(this.HURT_SEQUENCE)
        this.gravity(this)
    }

    animate() {
        setInterval(() => {
            this.selectAnimation()
        }, 1000 / 20)

        setInterval(() => {
            this.moveCharacter()
            this.jump()
        }, 1000 / 60)
    }

    selectAnimation() {
        if (this.world.controls.JUMP) {
            this.playAnimation(this.JUMPING_SEQUENCE)
        } else if (this.world.controls.MOVE_LEFT || this.world.controls.MOVE_RIGHT) {
            this.playAnimation(this.WALKING_SEQUENCE)
        } else if (this.died) {
            this.playAnimation(this.DIED_SEQUENCE)
        } else if (this.world.checkForCooldown()) {
            this.playAnimation(this.HURT_SEQUENCE)
        }

        if (this.world.controls.THROW) {
            this.world.throwBottle(this.mirrorImage, this.pos_x, this.pos_y)
        }
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

    jump() {
        if (this.world.controls.JUMP && this.vertical_speed == 0 && this.pos_y == this.character_base_y) {
            this.vertical_speed = -this.jump_speed
        }
    }
}