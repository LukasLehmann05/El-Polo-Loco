class BottleBar extends StatusBar {
    BOTTLE_BAR = [
        "../img/status_bars/1_statusbar/3_statusbar_bottle/orange/0.png",
        "../img/status_bars/1_statusbar/3_statusbar_bottle/orange/20.png",
        "../img/status_bars/1_statusbar/3_statusbar_bottle/orange/40.png",
        "../img/status_bars/1_statusbar/3_statusbar_bottle/orange/60.png",
        "../img/status_bars/1_statusbar/3_statusbar_bottle/orange/80.png",
        "../img/status_bars/1_statusbar/3_statusbar_bottle/orange/100.png",
    ]

    constructor() {
        super().loadImage(this.BOTTLE_BAR[5])
        this.loadImages(this.BOTTLE_BAR)
    }
}