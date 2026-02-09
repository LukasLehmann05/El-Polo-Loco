class Cloud extends Moveable_object {
    width = 600
    height = 400
    speed = 0.175
    target_fps = 1000/60

    constructor() {
        super().loadImage("../img/background/layers/4_clouds/1.png")

        this.pos_y = 50 + Math.random() * 50
        this.pos_x = Math.random() * 700
        this.moveCloud()
    }

    moveCloud() {
        this.moveLeft(this.speed,this.target_fps)
    }
}