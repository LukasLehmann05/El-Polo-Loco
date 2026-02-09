class World {
    character = new Character()
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ]

    clouds = [
        new Cloud(),
        new Cloud(),
    ]

    backgrounds = [
        new Background("../img/background/layers/3_third_layer/1.png"),
        new Background("../img/background/layers/3_third_layer/2.png"),
        new Background("../img/background/layers/2_second_layer/1.png"),
        new Background("../img/background/layers/2_second_layer/2.png"),
        new Background("../img/background/layers/1_first_layer/1.png"),
        new Background("../img/background/layers/1_first_layer/2.png"),
    ]

    canvas
    ctx

    constructor(canvas) {
        this.ctx = canvas.getContext("2d")
        this.canvas = canvas
        this.createWorld()
    }

    createWorld() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.addObjectsToMap(this.backgrounds)
        this.addObjectsToMap(this.clouds)
        this.addObjectsToMap(this.enemies)
        this.addToMap(this.character)

        requestAnimationFrame(function () {
            this.createWorld()
        }.bind(this))
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object)
        })

    }

    addToMap(objectToAdd) {
        this.ctx.drawImage(objectToAdd.img, objectToAdd.pos_x, objectToAdd.pos_y, objectToAdd.width, objectToAdd.height)
    }
}