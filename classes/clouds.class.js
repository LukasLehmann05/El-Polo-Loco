class Cloud extends Moveable_object {
    width = 600
    height = 400

    constructor() {
        super().loadImage("../img/background/layers/4_clouds/1.png")

        this.pos_y = 50 + Math.random() * 50
        this.pos_x = Math.random() * 700
    }
}