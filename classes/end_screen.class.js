class EndScreen extends DrawableObject {
    pos_x = 0
    pos_y = 0
    height = 720
    width = 1280

    end_image_lost = "../img/intro_outro/game_over/end_screen.png"
    end_image_won = "../img/intro_outro/start/startscreen_2.png"

    constructor(condition) {
        super()
        if (condition === "win") {
            this.loadImage(this.end_image_won)
        }   else if (condition === "lose") {
            this.loadImage(this.end_image_lost)
        }
    }
}