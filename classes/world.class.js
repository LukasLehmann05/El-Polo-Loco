class World {
    character = new Character()
    drawableObject = new DrawableObject()
    health_bar = new HealthBar()
    bottle_bar = new BottleBar()
    coin_bar = new CoinBar()
    throwableObject = new Throwable_Object()
    throwableObjects = []

    canvas
    ctx
    controls
    world
    camera_x = 0

    enemies = level1.enemies
    clouds = level1.clouds
    backgrounds = level1.backgrounds
    collectables = level1.collectables
    lastHit = 0
    damage_cooldown = 1

    max_bottles = 5
    current_bottles = this.max_bottles
    max_coins = 5
    current_coins = 0

    constructor(canvas, controls) {
        this.ctx = canvas.getContext("2d")
        this.canvas = canvas
        this.controls = controls
        this.createWorld()
        this.setWorld()
        this.checkForCollision()
    }

    createWorld() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.backgrounds)
        this.addObjectsToMap(this.clouds)
        this.addObjectsToMap(this.enemies)
        this.addObjectsToMap(this.collectables)
        this.addObjectsToMap(this.throwableObjects)
        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.bottle_bar)
        this.addToMap(this.health_bar)
        this.addToMap(this.coin_bar)
        this.ctx.translate(this.camera_x, 0)

        this.addToMap(this.character)

        this.ctx.translate(-this.camera_x, 0)

        requestAnimationFrame(function () {
            this.createWorld()
        }.bind(this))
    }

    checkForCollision() {
        setInterval(() => {
            this.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    if (enemy instanceof Chicken) {
                        this.checkForJumpKill(enemy)
                    } else {
                        this.damageCharacter()
                    }
                }
            })

            this.collectables.forEach((collectable) => {
                if (this.character.isColliding(collectable)) {
                    if (collectable instanceof bottleCollectable) {
                        if (this.current_bottles < this.max_bottles) {
                            collectable.hideBottle()
                            this.current_bottles += 1
                            this.bottle_bar.updateBottleBar(this.current_bottles)
                        }
                    }
                }
            })
        }, 1000 / 10);
    }

    checkForJumpKill(enemy) {
        if (this.character.vertical_speed > 0 && !enemy.died) { //&& this.character.pos_y < enemy.pos_y
            enemy.died = true
            enemy.chickenDied()
        } else if (!enemy.died) {
            this.damageCharacter()
        }
    }

    damageCharacter() {
        let new_hit = new Date().getTime()
        let timepassed = (new_hit - this.lastHit) / 1000
        if (timepassed > this.damage_cooldown) {
            if (this.drawableObject.health > 0) {
                this.drawableObject.health -= this.drawableObject.damage
                this.lastHit = new Date().getTime()
            }
            this.health_bar.updateHealthBar(this.drawableObject.health)
        }
        this.characterDied()
    }

    characterDied() {
        if (this.drawableObject.health <= 0) {
            this.character.died = true
            return true
        }
    }

    setWorld() {
        this.character.world = this
        this.drawableObject.world = this
        this.character.animate()
    }

    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object)
        })

    }

    checkForCooldown() {
        let timepassed = new Date().getTime() - this.lastHit
        timepassed = timepassed / 1000
        return timepassed < 0.2
    }

    throwBottle(mirrorImage, pos_x, pos_y) {
        if (!this.throwableObject.checkThrowCooldown() && this.current_bottles > 0) {
            const newBottle = new Throwable_Object()
            newBottle.throwBottle(mirrorImage, pos_x, pos_y)
            this.throwableObjects.push(newBottle)
            this.throwableObject.last_throw = new Date().getTime()
            this.current_bottles -= 1
            this.bottle_bar.updateBottleBar(this.current_bottles)
        }
    }

    addToMap(objectToAdd) {
        if (objectToAdd.visible === false) {
            return
        }
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