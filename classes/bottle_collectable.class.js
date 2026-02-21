class bottleCollectable extends Moveable_object{

    BOTTLE_TYPES = [
        "../img/salsa_bottle/1_salsa_bottle_on_ground.png",
        "../img/salsa_bottle/2_salsa_bottle_on_ground.png",
    ]

    pos_y = 520
    width = 100
    height = 125
    collected = false

    constructor(pos_x){
        super().loadImage(this.returnRandomBottle())
        this.pos_x = pos_x 
    }

    returnRandomBottle() {
        let randomNumber = Math.random()
        if (randomNumber < 0.5) {
            return this.BOTTLE_TYPES[0]
        } else {
            return this.BOTTLE_TYPES[1]
        }
    }

    hideBottle() {
        this.collected = true
        this.pos_x = -200
    }
}