class World {
    game_started = false
    game_ended = false
    display_endscreen = false
    isPhone = false
    win = false
    character = new Character()
    drawableObject = new DrawableObject()
    health_bar = new HealthBar()
    bottle_bar = new BottleBar()
    coin_bar = new CoinBar()
    level = new Level()
    boss_bar = false
    throwableObject = new Throwable_Object()
    throwableObjects = []
    single_hud_object = []
    game_over_info = new Game_Over_Info()

    canvas
    ctx
    controls
    world
    camera_x = 0

    enemies = []
    clouds = []
    backgrounds = []
    collectables = []
    lastHit = 0
    damage_cooldown = 1

    max_bottles = 5
    current_bottles = this.max_bottles
    max_coins = 5
    current_coins = 0
    bottle_damage = 1

    constructor(canvas, controls) {
        this.setWorld()
        this.ctx = canvas.getContext("2d")
        this.canvas = canvas
        this.controls = controls
        this.createWorld()
        this.checkForCollision()
    }

    addGameContent() {
        this.addObjectsToMap(this.backgrounds)
        this.addObjectsToMap(this.clouds)
        this.addObjectsToMap(this.enemies)
        this.addObjectsToMap(this.collectables)
        this.addObjectsToMap(this.throwableObjects)
        this.addToMap(this.character)
        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.bottle_bar)
        this.addToMap(this.health_bar)
        this.addToMap(this.coin_bar)
        if (this.single_hud_object.length > 0) {
            this.addObjectsToMap(this.single_hud_object)
        }
        this.ctx.translate(this.camera_x, 0)
    }

    displayScreen() {
        if (!this.game_started) {
            this.addToMap(new StartingScreen())
        }
        if (this.display_endscreen) {
            if (this.win) {
                this.addToMap(new EndScreen("win"))
            } else {
                this.addToMap(new EndScreen("lose"))
            }
        }
    }

    createWorld() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0)
        if (this.game_started) {
            this.addGameContent()
        }
        this.ctx.translate(-this.camera_x, 0)
        this.displayScreen()
        requestAnimationFrame(function () {
            this.createWorld()
        }.bind(this))
    }

    startGame() {
        this.game_started = true
        if (this.isPhone) {
            document.querySelectorAll(".mobile-move-buttons").forEach(button => {
                button.style.display = "block"
            })
        }
    }

    game_over(condition) {
        if (!this.game_ended) {
            this.game_ended = true

            this.displayGameOverScreen(condition)
            displayRestartButton()
            hideMobileControls()

            setTimeout(() => {
                this.display_endscreen = true
            }, 3000)
        }
    }

    displayGameOverScreen(condition) {
        if (condition === "win") {
            this.win = true
            this.game_over_info.game_won()
            playSound(sound_game_won)
        } else if (condition === "lose") {
            this.game_over_info.game_lost()
            playSound(sound_game_lost)
        }
    }

    AddSingleObjectToMap(object) {
        this.single_hud_object.push(object)
    }

    checkForCollision() {
        setInterval(() => {
            this.checkEnemyCollision()
            this.checkCollectAbleCollision()
            this.checkThrowableObjectCollision()
            this.character.checkForBottleThrow()
        }, 1000 / 10);
    }

    checkEnemyCollision() {
        this.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.died) {
                if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                    this.checkForJumpKill(enemy)
                } else {
                    this.damageCharacter()
                }
            }
        })
    }

    checkCollectAbleCollision() {
        this.collectables.forEach((collectable) => {
            if (this.character.isColliding(collectable)) {
                this.checkForPickup(collectable)
            }
        })
    }

    checkForPickup(collectable) {
        if (collectable instanceof bottleCollectable) {
            if (this.current_bottles < this.max_bottles && !collectable.collected) {
                this.pickupBottle(collectable)
            }
        } else if (collectable instanceof coinCollectable) {
            if (this.current_coins < this.max_coins && !collectable.collected) {
                this.pickupCoin(collectable)
            }
        }
    }

    checkThrowableObjectCollision() {
        this.throwableObjects.forEach((bottle) => {
            this.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !enemy.died) {
                    this.bottleHit(bottle, enemy)
                }
            })
        })
    }

    bottleHit(bottle, enemy) {
        if (enemy.health > 0 && bottle.bottle_hit === false) {
            enemy.health -= this.bottle_damage
            bottle.bottle_hit = true
            this.checkForEnemyDeath(enemy)
            if (enemy instanceof Endboss && this.single_hud_object[0] instanceof BossBar) {
                this.single_hud_object[0].updateBossBar(enemy.health)
            }
        }
    }

    checkForEnemyDeath(enemy) {
        if (enemy.health == 0) {
            this.killEnemy(enemy)
            if (enemy instanceof Endboss) {
                if (this.single_hud_object[0] instanceof BossBar) {
                    this.single_hud_object[0].updateBossBar(enemy.health)
                    this.removeBossBar()
                    this.game_over("win")
                }
            }
        }
    }

    pickupCoin(collectable) {
        collectable.hideCoin()
        this.current_coins += 1
        this.coin_bar.updateCoinBar(this.current_coins)
    }

    pickupBottle(collectable) {
        collectable.hideBottle()
        this.current_bottles += 1
        this.bottle_bar.updateBottleBar(this.current_bottles)
    }

    checkForJumpKill(enemy) {
        if (this.character.vertical_speed > 0 && !enemy.died) { //&& this.character.pos_y < enemy.pos_y
            this.killEnemy(enemy)
        } else if (!enemy.died) {
            this.damageCharacter()
        }
    }

    killEnemy(enemy) {
        enemy.died = true
        enemy.enemyKilled()
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
        if (this.drawableObject.health <= 0 && !this.character.died) {
            this.character.died = true
            this.game_over("lose")
            return true
        }
    }

    setWorld() {
        this.level.world = this
        this.character.world = this
        this.drawableObject.world = this
        this.throwableObject.world = this
        this.game_over_info.world = this
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

    removeBossBar() {
        this.single_hud_object.pop(BossBar)
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