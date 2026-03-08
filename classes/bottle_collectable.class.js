/**
 * @file bottle_collectable.class.js
 * @description Contains bottle collectable data for the game to be displayed.
 */
class bottleCollectable extends Moveable_object{

    BOTTLE_TYPES = [
        "../img/salsa_bottle/1_salsa_bottle_on_ground.png",
        "../img/salsa_bottle/2_salsa_bottle_on_ground.png",
    ]

    pos_y = 520
    width = 100
    height = 125
    collected = false

    /**
     * Class initialization.
     * @param {number} pos_x x position of the bottle.
     */
    constructor(pos_x){
        super().loadImage(this.returnRandomBottle())
        this.pos_x = pos_x 
    }

    /**
     * Returns a random bottle image path.
     * @returns {string} Path of the bottle image.
     */
    returnRandomBottle() {
        let randomNumber = Math.random()
        if (randomNumber < 0.5) {
            return this.BOTTLE_TYPES[0]
        } else {
            return this.BOTTLE_TYPES[1]
        }
    }

    /**
     * Hides the bottle by setting its collected status to true and moving it off-screen.
     */
    hideBottle() {
        this.collected = true
        this.pos_x = -200
    }
}
