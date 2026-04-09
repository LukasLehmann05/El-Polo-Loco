/**
 * @file world.class.js
 * @description Contains main game handling and rendering for the game.
 */
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

    /**
     * Initializes a new game world.
     * @param {*} canvas
     * @param {*} controls
     */
    constructor(canvas, controls) {
        this.setWorld()
        this.ctx = canvas.getContext("2d")
        this.canvas = canvas
        this.controls = controls
        this.createWorld()
        this.checkForCollision()
    }

    /**
     * Adds all game objects.
     */
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

    /**
     * Displays the starter or end screen.
     */
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

    /**
     * Renders the game world continiously.
     */
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

    /**
     * Starts the game, displays mobile buttons.
     */
    startGame() {
        this.game_started = true
        this.controls.canControl = true
        this.character.died = false
        this.drawableObject.health = 100
        this.current_bottles = this.max_bottles
        this.current_coins = 0
        this.resetStatusBars()
        if (this.isPhone) {
            document.querySelectorAll(".mobile-move-buttons").forEach(button => {
                button.style.display = "block"
            })
        }
    }

    /**
     * Handles the game over display.
     * @param {string} condition contains either "win" or "loss"
     */
    game_over(condition) {
        if (!this.game_ended) {
            this.game_ended = true
            this.controls.canControl = false
            this.controls.resetControls()
            this.displayGameOverScreen(condition)

            setTimeout(() => {
                this.display_endscreen = true
                clearOldWorld()
                displayRestartButton()
                resetAdditionalAudioElements()
            }, 3000)
        }
    }

    /**
     * Displays the game over screen.
     * @param {string} condition win or lose condition
     */
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

    /**
     * Adds a single stationary object to the map.
     * @param {class} object the object to be added.
     */
    AddSingleObjectToMap(object) {
        this.single_hud_object.push(object)
    }

    /**
     * Checks all objects for collision.
     */
    checkForCollision() {
        setInterval(() => {
            this.checkEnemyCollision()
            this.checkCollectAbleCollision()
            this.checkThrowableObjectCollision()
            this.character.checkForBottleThrow()
        }, 1000 / 10);
    }

    /**
     * Checks if the enemy collides with a enemy.
     */
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

    /**
     * Checks if the player collides with a collectable.
     */
    checkCollectAbleCollision() {
        this.collectables.forEach((collectable) => {
            if (this.character.isColliding(collectable)) {
                this.checkForPickup(collectable)
            }
        })
    }

    /**
     * Checks if the collectable can be picked up by the player.
     * @param {class} collectable object that wants to be picked up
     */
    checkForPickup(collectable) {
        if (collectable instanceof bottleCollectable) {
            this.pickupBottle(collectable)
        } else if (collectable instanceof coinCollectable) {
            this.pickupCoin(collectable)
        }
    }

    /**
     * Checks if the bottle collidies with a enemy.
     */
    checkThrowableObjectCollision() {
        this.throwableObjects.forEach((bottle) => {
            this.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !enemy.died) {
                    this.bottleHit(bottle, enemy)
                }
            })
        })
    }

    /**
     * Checks if the bottle can kill or damage the enemy.
     * @param {class} bottle class of the bottle to be checked
     * @param {class} enemy class of the enemy to be checked
     */
    bottleHit(bottle, enemy) {
        if (enemy.health > 0 && bottle.bottle_hit === false) {
            enemy.health -= this.bottle_damage
            bottle.bottle_hit = true
            this.checkForEnemyDeath(enemy)
            if (enemy instanceof Endboss && this.single_hud_object[0] instanceof BossBar) {
                this.single_hud_object[0].updateBossBar(enemy.health)
                playSound("../sounds/endboss_hurt.wav")
            }
        }
    }

    /**
     * Checks if the enemy has died. Updates bossbar if the enemy is a boss
     * @param {class} enemy class of the enemy to check
     */
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

    /**
     * Picks up a coin, hides the coin and updates the coin bar.
     * @param {class} collectable class of the collectable
     */
    pickupCoin(collectable) {
        collectable.hideCoin()
        if (this.current_coins < this.max_coins) {
            this.current_coins += 1
            this.coin_bar.updateCoinBar(this.current_coins)
        }
    }

    /**
     * Picks up a bottle, hides the bottle and updates the bottle bar.
     * @param {class} collectable class of the collectable
     */
    pickupBottle(collectable) {
        collectable.hideBottle()
        if (this.current_bottles < this.max_bottles) {
            this.current_bottles += 1
            this.bottle_bar.updateBottleBar(this.current_bottles)
        }
    }

    /**
     * Checks if the enemy can be killed.
     * @param {class} enemy class of the enemy to be jump killed
     */
    checkForJumpKill(enemy) {
        if (this.character.vertical_speed > 0 && !enemy.died) {
            this.killEnemy(enemy)
        } else if (!enemy.died) {
            this.damageCharacter()
        }
    }

    /**
     * Kills the enemy.
     * @param {class} enemy class of the enemy to kill
     */
    killEnemy(enemy) {
        enemy.died = true
        enemy.enemyKilled()
    }

    /**
     * Damages the character.
     */
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

    /**
     * Checks if the character has died.
     */
    characterDied() {
        if (this.drawableObject.health <= 0 && !this.character.died) {
            this.character.died = true
            this.game_over("lose")
            return true
        }
    }

    /**
     * Sets the world for given game objects.
     */
    setWorld() {
        this.level.world = this
        this.character.world = this
        this.drawableObject.world = this
        this.throwableObject.world = this
        this.game_over_info.world = this
        this.character.animate()
    }

    /**
     * Adds multiple objects to the map.
     * @param {Array} objects array of objects to be added
     */
    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object)
        })

    }

    /**
     * Checks if the character is in cooldown.
     */
    checkForCooldown() {
        let timepassed = new Date().getTime() - this.lastHit
        timepassed = timepassed / 1000
        return timepassed < 0.2
    }

    /**
     * Throws the bottle and checks if its possible.
     * @param {boolean} mirrorImage indicates if the bottle moves left or right
     * @param {number} pos_x the x position to throw the bottle from
     * @param {number} pos_y the y position to throw the bottle from
     */
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

    /**
     * Removes the boss bar from the HUD.
     */
    removeBossBar() {
        this.single_hud_object.pop(BossBar)
    }

    /**
     * Adds a single object to the map.
     * @param {class} objectToAdd the object to be added to the map
     */
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
        this.ctx.restore()
    }

    /**
    * Resets the status bars in the HUD.
    */
    resetStatusBars() {
        this.health_bar.updateHealthBar(this.drawableObject.health)
        this.bottle_bar.updateBottleBar(this.current_bottles)
        this.coin_bar.updateCoinBar(this.current_coins)
    }
}