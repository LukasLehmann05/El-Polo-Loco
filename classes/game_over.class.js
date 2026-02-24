class Game_Over_Info extends DrawableObject {
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

    won_images = [
        "../img/game_ended/win_1.png",
        "../img/game_ended/win_2.png",
        "../img/game_ended/win_3.png",
        "../img/game_ended/win_4.png",
    ]

    game_lost_image
    game_won_image


    constructor() {
        super()
        this.loadImages(this.lost_images)
        this.loadImages(this.won_images)
    }

    game_lost() {
        this.game_lost_image = this.returnRandomGameOverImage(this.lost_images)
        this.loadImage(this.game_lost_image)

        if (this.world.game_ended === true && !this.shown) {
            this.shown = true
            this.world.AddSingleObjectToMap(this)
        }

        this.showAnimation()
    }

    game_won() {
        this.game_won_image = this.returnRandomGameOverImage(this.won_images)
        this.loadImage(this.game_won_image)

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

    returnRandomGameOverImage(img_array) {
        const randomIndex = Math.floor(Math.random() * img_array.length)
        return img_array[randomIndex]
    }

}