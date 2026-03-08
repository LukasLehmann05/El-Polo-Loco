/**
 * @file health_bar.class.js
 * @description Contains health bar data for the game to be displayed.
 */
class HealthBar extends StatusBar {
    HEALTH_BAR = [
        "../img/status_bars/1_statusbar/2_statusbar_health/orange/0.png",
        "../img/status_bars/1_statusbar/2_statusbar_health/orange/20.png",
        "../img/status_bars/1_statusbar/2_statusbar_health/orange/40.png",
        "../img/status_bars/1_statusbar/2_statusbar_health/orange/60.png",
        "../img/status_bars/1_statusbar/2_statusbar_health/orange/80.png",
        "../img/status_bars/1_statusbar/2_statusbar_health/orange/100.png",
    ]

    pos_y = 120

    /**
     * Class initialization.
     */
    constructor() {
        super().loadImage(this.HEALTH_BAR[5])
        this.loadImages(this.HEALTH_BAR)
    }

    /**
     * Updates the health bar based on the player's health.
     * @param {*} health
     */
    updateHealthBar(health) {
        this.setPercentage(health / this.max_health * 100, this.HEALTH_BAR)
    }
}
