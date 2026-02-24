class StartingScreen extends DrawableObject {
    pos_x = 0
    pos_y = 0
    height = 720
    width = 1280

    starter_image = "../img/intro_outro/start/startscreen_1.png"

    constructor() {
        super()
        this.loadImage(this.starter_image)
    }
}