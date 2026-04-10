/**
 * @file drawable-objects.class.js
 * @description Contains drawable object data for the game to be displayed.
 */
class DrawableObject{
    pos_x = 120
    pos_y = 500
    img
    height = 150
    width = 100
    currentImage = 0
    col_offset_x = 0
    col_offset_y = 0

    imageCache = {}

    damage = 20
    health = 100
    coins = 0
    bottles = 0

    /**
     * Class initialization.
     */
    constructor() {

    }

    /**
     * Pre loads the given image to avoid loading times in the game.
     * @param {string} path The path to the image to be loaded.
     */
    loadImage(path) {
        this.img = new Image()
        this.img.src = path
    }

    /**
     * Pre loads the given images to avoid loading times in the game.
     * @param {string[]} img_array The array of image paths to be loaded.
     */
    loadImages(img_array) {
        img_array.forEach((path) => {
            let img = new Image()
            img.src = path
            this.imageCache[path] = img
        })
    }

}
