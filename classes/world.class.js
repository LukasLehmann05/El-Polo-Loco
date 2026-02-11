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
        new Background("../img/background/layers/air.png", 0),
        new Background("../img/background/layers/air.png", 1280),
        new Background("../img/background/layers/air.png", -1280),
        new Background("../img/background/layers/3_third_layer/1.png", 0),
        new Background("../img/background/layers/3_third_layer/2.png", 1280),
        new Background("../img/background/layers/3_third_layer/2.png", -1280),
        new Background("../img/background/layers/2_second_layer/1.png", 0),
        new Background("../img/background/layers/2_second_layer/2.png", 1280),
        new Background("../img/background/layers/2_second_layer/2.png", -1280),
        new Background("../img/background/layers/1_first_layer/1.png", 0),
        new Background("../img/background/layers/1_first_layer/2.png", 1280),
        new Background("../img/background/layers/1_first_layer/2.png", -1280),
    ]

    canvas
    ctx
    controls
    world
    camera_x = 0

    constructor(canvas, controls) {
        this.ctx = canvas.getContext("2d")
        this.canvas = canvas
        this.controls = controls
        this.createWorld()
        this.setWorld()
    }

    createWorld() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.backgrounds)
        this.addObjectsToMap(this.clouds)
        this.addObjectsToMap(this.enemies)
        this.addToMap(this.character)

        this.ctx.translate(-this.camera_x, 0)

        requestAnimationFrame(function () {
            this.createWorld()
        }.bind(this))
    }

    setWorld() {
        this.character.world = this
    }

    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object)
        })

    }

    addToMap(objectToAdd) {
        this.ctx.save()
        if (objectToAdd.mirrorImage) {
            this.ctx.translate(objectToAdd.pos_x + objectToAdd.width, 0)
            this.ctx.scale(-1, 1)
        }
        this.ctx.drawImage(
            objectToAdd.img,
            objectToAdd.mirrorImage ? 0 : objectToAdd.pos_x,
            objectToAdd.pos_y,
            objectToAdd.width,
            objectToAdd.height
        )
        this.ctx.restore()
    }
}