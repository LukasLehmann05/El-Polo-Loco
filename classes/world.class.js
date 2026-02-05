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

    canvas
    ctx

    constructor(canvas) {
        this.ctx = canvas.getContext("2d")
        this.canvas = canvas
        this.createWorld()
    }

    createWorld() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.character.img, this.character.pos_x, this.character.pos_y, this.character.width, this.character.height)

        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.pos_x, enemy.pos_y, enemy.width, enemy.height)
        })

        this.clouds.forEach(cloud => {
            this.ctx.drawImage(cloud.img, cloud.pos_x, cloud.pos_y, cloud.width, cloud.height)
        })

        requestAnimationFrame(function () {
            this.createWorld()
        }.bind(this))
    }
}