class World {
    character = new Character()

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

    enemies = level1.enemies
    clouds = level1.clouds
    backgrounds = level1.backgrounds

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
        this.character.animate()
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
        const drawX = objectToAdd.mirrorImage ? 0 : objectToAdd.pos_x
        this.ctx.drawImage(objectToAdd.img, drawX, objectToAdd.pos_y, objectToAdd.width, objectToAdd.height)
        this.addCollisionBox(objectToAdd, drawX)
        this.ctx.restore()
    }

    addCollisionBox(objectToAdd, drawX = objectToAdd.pos_x) {
        if (objectToAdd instanceof Character || objectToAdd instanceof Endboss || objectToAdd instanceof Chicken) {
            this.ctx.beginPath()
            this.ctx.lineWidth = "1"
            this.ctx.strokeStyle = "red"
            this.ctx.rect(drawX, objectToAdd.pos_y, objectToAdd.width, objectToAdd.height)
            this.ctx.stroke()
        }
    }
}