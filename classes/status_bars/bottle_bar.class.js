/**
 * @file bottle_bar.class.js
 * @description Contains bottle bar data for the game to be displayed.
 */
class BottleBar extends StatusBar {
    BOTTLE_BAR = [
        "../img/status_bars/1_statusbar/3_statusbar_bottle/orange/0.png",
        "../img/status_bars/1_statusbar/3_statusbar_bottle/orange/20.png",
        "../img/status_bars/1_statusbar/3_statusbar_bottle/orange/40.png",
        "../img/status_bars/1_statusbar/3_statusbar_bottle/orange/60.png",
        "../img/status_bars/1_statusbar/3_statusbar_bottle/orange/80.png",
        "../img/status_bars/1_statusbar/3_statusbar_bottle/orange/100.png",
    ]

    /**
     * Class initialization.
     */
    constructor() {
        super().loadImage(this.BOTTLE_BAR[5])
        this.loadImages(this.BOTTLE_BAR)
    }

    /**
     * Updates the bottle bar based on the number of bottles.
     * @param {*} bottles
     */
    updateBottleBar(bottles) {
        this.setPercentage(bottles / this.max_bottles * 100, this.BOTTLE_BAR)
    }
}
