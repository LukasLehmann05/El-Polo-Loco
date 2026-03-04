class EndScreen extends DrawableObject {
    pos_x = 0
    pos_y = 0
    height = 720
    width = 1280

    end_image = "../img/intro_outro/game_over/end_screen.png"

    constructor() {
        super()
        this.loadImage(this.end_image)
    }
}