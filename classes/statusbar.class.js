/**
 * @file statusbar.class.js
 * @description This class contains the main progressbar handling.
 */
class StatusBar extends DrawableObject {

    percentage = 100
    max_health = 100
    max_bottles = 5
    max_coins = 5

    array_index = 0

    pos_x = 30
    pos_y = 10
    width = 300
    height = 80

    /**
     * Class initialization.
     */
    constructor() {
        super()
    }

    /**
     * Sets the progress bars percentage and pics a given image.
     * @param {*} percentage calculated percentage to be displayed.
     * @param {*} imgArray array of images to be used for the progress bar.
     */
    setPercentage(percentage, imgArray) {
        this.percentage = percentage
        this.array_index = this.returnImageIndex()
        let path = imgArray[this.array_index]
        this.img = this.imageCache[path]
    }

    /**
     * Returns the index of the image to be displayed based on the current percentage.
     * @return {number} The index of the image to be displayed.
     */
    returnImageIndex() {
        switch (this.percentage) {
            case 0:
                return 0
            case 20:
                return 1
            case 40:
                return 2
            case 60:
                return 3
            case 80:
                return 4
            case 100:
                return 5
            default:
                return 0
        }
    }

}
