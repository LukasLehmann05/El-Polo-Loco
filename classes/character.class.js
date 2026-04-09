/**
 * @file character.class.js
 * @description Contains character data for the game to be displayed.
 */
class Character extends Moveable_object {

    levels = 3

    height = 400
    width = 250
    col_offset_x = 120
    pos_y = 260
    speed = 10
    character_offet_right = 200
    limit_left = -1080
    limit_right = (this.levels) * 2560 - 1080
    character_base_y = 260

    acceleration = -0.5
    jump_speed = 15
    vertical_speed = 0

    last_move = new Date().getTime()
    is_jumping = false

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

    IDLE_SEQUENCE = [
        "../img/pepe/1_idle/idle/I-1.png",
        "../img/pepe/1_idle/idle/I-2.png",
        "../img/pepe/1_idle/idle/I-3.png",
        "../img/pepe/1_idle/idle/I-4.png",
        "../img/pepe/1_idle/idle/I-5.png",
        "../img/pepe/1_idle/idle/I-6.png",
        "../img/pepe/1_idle/idle/I-7.png",
        "../img/pepe/1_idle/idle/I-8.png",
        "../img/pepe/1_idle/idle/I-9.png",
        "../img/pepe/1_idle/idle/I-10.png",
    ]

    SLEEPING_SEQUENCE = [
        "../img/pepe/1_idle/long_idle/I-11.png",
        "../img/pepe/1_idle/long_idle/I-12.png",
        "../img/pepe/1_idle/long_idle/I-13.png",
        "../img/pepe/1_idle/long_idle/I-14.png",
        "../img/pepe/1_idle/long_idle/I-15.png",
        "../img/pepe/1_idle/long_idle/I-16.png",
        "../img/pepe/1_idle/long_idle/I-17.png",
        "../img/pepe/1_idle/long_idle/I-18.png",
        "../img/pepe/1_idle/long_idle/I-19.png",
        "../img/pepe/1_idle/long_idle/I-20.png",
    ]

    /**
     * Class initialization.
     */
    constructor() {
        super().loadImage("../img/pepe/1_idle/idle/I-1.png")
        this.loadImages(this.WALKING_SEQUENCE)
        this.loadImages(this.JUMPING_SEQUENCE)
        this.loadImages(this.DIED_SEQUENCE)
        this.loadImages(this.HURT_SEQUENCE)
        this.loadImages(this.IDLE_SEQUENCE)
        this.loadImages(this.SLEEPING_SEQUENCE)
        this.gravity(this)
    }

    /**
     * Sets an interval to fire functions for animation play check.
     */
    animate() {
        setInterval(() => {
            this.selectAnimation()
        }, 1000 / 10)

        setInterval(() => {
            this.moveCharacter()
            this.jump()
        }, 1000 / 60)
    }

    /**
     * Loops through a single animation sequence.
     * @param {Array<string>} animation_sequence sequence contains all image paths of the animation.
     */
    playSingleAnimation(animation_sequence) {
        this.is_jumping = true
        let currentImage = 0
        let animLenght = animation_sequence.length

        let singleAnim = setInterval(() => {
            let path = animation_sequence[currentImage]
            this.img = this.imageCache[path]
            currentImage++
            if (currentImage >= animLenght) {
                clearInterval(singleAnim)
                this.is_jumping = false
            }
        }, 1000 / 13)
    }

    /**
     * Selects the animation to be played depending on control input.
     */
    selectAnimation() {
        if (this.world.controls.JUMP && !this.died || this.is_jumping) {
            if (!this.is_jumping) {
                this.playSingleAnimation(this.JUMPING_SEQUENCE)
            }
            this.last_move = new Date().getTime()
        } else if (this.died) {
            this.playAnimation(this.DIED_SEQUENCE)
        } else if (this.world.controls.MOVE_LEFT || this.world.controls.MOVE_RIGHT && !this.died) {
            this.playAnimation(this.WALKING_SEQUENCE)
            this.last_move = new Date().getTime()
        } else if (this.world.checkForCooldown() && !this.died) {
            this.playAnimation(this.HURT_SEQUENCE)
        } else if (new Date().getTime() - this.last_move > 15000 && !this.died) {
            this.playAnimation(this.SLEEPING_SEQUENCE)
        } else {
            this.playAnimation(this.IDLE_SEQUENCE)
        }
    }

    /**
     * Checks if the players has initialized a bottle throw.
     */
    checkForBottleThrow() {
        if (this.world.controls.THROW) {
            this.world.throwBottle(this.mirrorImage, this.pos_x, this.pos_y)
        }
    }

    /**
     * Moves the character based on control input.
     */
    moveCharacter() {
        if (this.world.controls.MOVE_LEFT && this.pos_x > this.limit_left && !this.died) {
            this.pos_x -= this.speed
            this.mirrorImage = true
        } else if (this.world.controls.MOVE_RIGHT && this.pos_x < this.limit_right && !this.died) {
            this.pos_x += this.speed
            this.mirrorImage = false
        }

        if (this.pos_x > 5200 && this.world.boss_bar === false) {
            this.world.boss_bar = true
            this.world.AddSingleObjectToMap(new BossBar())
            let endboss = this.world.enemies.find(enemy => enemy instanceof Endboss)
            endboss.world = this.world
            endboss.endbossTriggered()
        }

        this.world.camera_x = -this.pos_x + this.character_offet_right
    }

    /**
     * Makes the character jump if character is on ground and jump control is fired.
     */
    jump() {
        if (this.world.controls.JUMP && this.vertical_speed == 0 && this.pos_y == this.character_base_y && !this.died) {
            this.vertical_speed = -this.jump_speed
        }
    }
}
