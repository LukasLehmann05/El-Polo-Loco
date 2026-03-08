/**
 * @file sky.class.js
 * @description Contains sky data for the game to be displayed.
 */
class Sky extends Moveable_object {
    /**
     * Class initialization.
     * @param {string} sky_image The path to the sky image.

     */
    constructor(sky_image) {
        super().loadImage(sky_image)
        this.pos_x = 0
        this.pos_y = 0
        this.width = canvas_width
        this.height = canvas_height
    }
}
