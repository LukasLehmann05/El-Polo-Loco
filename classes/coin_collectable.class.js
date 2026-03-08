/**
 * @file coin_collectable.class.js
 * @description Contains coin collectable data for the game to be displayed.
 */
class coinCollectable extends Moveable_object {
    pos_y = 420
    width = 175
    height = 175
    collected = false

    coin_image = "img/coin/coin_1.png"

    /**
     * Class initialization.
     * @param {number} pos_x position of the coin on the x axis.
     */
    constructor(pos_x) {
        super().loadImage(this.coin_image)
        this.pos_x = pos_x
    }

    /**
     * Hides the coin when collected.
     */
    hideCoin() {
        this.collected = true
        this.pos_x = -200
    }
}
