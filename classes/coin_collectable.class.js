class coinCollectable extends Moveable_object {
    pos_y = 420
    width = 175
    height = 175
    collected = false

    coin_image = "img/coin/coin_1.png"

    constructor(pos_x) {
        super().loadImage(this.coin_image)
        this.pos_x = pos_x
    }

    hideCoin() {
        this.collected = true
        this.pos_x = -200
    }
}