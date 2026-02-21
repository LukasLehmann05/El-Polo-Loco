class BossBar extends StatusBar {
    pos_x = 490
    max_boss_health = 5

    BOSS_BAR = [
        "../img/status_bars/2_statusbar_endboss/blue/blue0.png",
        "../img/status_bars/2_statusbar_endboss/blue/blue20.png",
        "../img/status_bars/2_statusbar_endboss/blue/blue40.png",
        "../img/status_bars/2_statusbar_endboss/blue/blue60.png",
        "../img/status_bars/2_statusbar_endboss/blue/blue80.png",
        "../img/status_bars/2_statusbar_endboss/blue/blue100.png",
    ]

    constructor() {
        super().loadImage(this.BOSS_BAR[5])
        this.loadImages(this.BOSS_BAR)
    }

    updateBossBar(bossHealth) {
        this.setPercentage(bossHealth / this.max_boss_health * 100, this.BOSS_BAR)
    }
}