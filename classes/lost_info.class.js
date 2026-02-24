class Lost_Info extends DrawableObject {
    pos_x = (1280 - 400) / 2
    pos_y = (720 - 200) / 2
    width = 400
    height = 200
    shown = false

    lost_images = [
        "../img/game_ended/lost_1.png",
        "../img/game_ended/lost_2.png",
        "../img/game_ended/lost_3.png",
        "../img/game_ended/lost_4.png",
    ]

    game_over_image

    constructor() {
        super()
        this.loadImages(this.lost_images)
    }

    game_ended() {
        this.game_over_image = this.returnRandomGameOverImage()
        this.loadImage(this.game_over_image)

        if (this.world.game_ended === true && !this.shown) {
            this.shown = true
            this.world.AddSingleObjectToMap(this)
        }

        this.showAnimation()
    }

    showAnimation() {
        setInterval(() => {
            if (this.width < 800) {
                this.width += 18
                this.height += 9
                this.pos_x -= 9
                this.pos_y -= 4.5
            }
        }, 1000 / 30);
    }

    returnRandomGameOverImage() {
        const randomIndex = Math.floor(Math.random() * this.lost_images.length)
        return this.lost_images[randomIndex]
    }

}