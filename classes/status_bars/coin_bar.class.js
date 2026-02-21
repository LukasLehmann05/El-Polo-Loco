class CoinBar extends StatusBar {
    COIN_BAR = [
        "../img/status_bars/1_statusbar/1_statusbar_coin/orange/0.png",
        "../img/status_bars/1_statusbar/1_statusbar_coin/orange/20.png",
        "../img/status_bars/1_statusbar/1_statusbar_coin/orange/40.png",
        "../img/status_bars/1_statusbar/1_statusbar_coin/orange/60.png",
        "../img/status_bars/1_statusbar/1_statusbar_coin/orange/80.png",
        "../img/status_bars/1_statusbar/1_statusbar_coin/orange/100.png",
    ]

    pos_y = 65

    constructor() {
        super().loadImage(this.COIN_BAR[0])
        this.loadImages(this.COIN_BAR)
    }
}