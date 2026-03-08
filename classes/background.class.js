/**
 * @file background.class.js
 * @description Contains background data for the game to be displayed.
 */
class Background extends Moveable_object{

    pos_y = 240

    width = 1280
    height = 720

    /**
     * Class initialization.
     * @param {string} img_path path of the background image.
     * @param {number} pos_x x position of the background.
     */
    constructor(img_path,pos_x){
        super().loadImage(img_path)
        this.pos_x = pos_x
        this.pos_y = canvas_height - this.height 
    }
}
