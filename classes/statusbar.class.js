class StatusBar extends DrawableObject {

    percentage = 100
    max_health = 100
    max_bottles = 5
    max_coins = 5

    array_index = 0

    pos_x = 30
    pos_y = 10
    width = 300
    height = 80

    constructor() {
        super()
    }

    setPercentage(percentage, imgArray) {
        this.percentage = percentage
        this.array_index = this.returnImageIndex()
        let path = imgArray[this.array_index]
        this.img = this.imageCache[path]
    }

    returnImageIndex() {
        switch (this.percentage) {
            case 0:
                return 0
            case 20:
                return 1
            case 40:
                return 2
            case 60:
                return 3
            case 80:
                return 4
            case 100:
                return 5
            default:
                return 0
        }
    }

}