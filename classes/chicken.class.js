class Chicken extends Moveable_object {

    constructor() {
        super().loadImage("../img/enemies/chicken/chicken_normal/1_walk/1_w.png")

        this.pos_x = 300 + Math.random() * 700
        this.pos_y = 500
    }
    
}