class Chicken extends Moveable_object {

    pos_y = 520
    height = 125
    width = 100

    WALKING_SEQUENCE = [
        "../img/enemies/chicken/chicken_normal/1_walk/1_w.png",
        "../img/enemies/chicken/chicken_normal/1_walk/2_w.png",
        "../img/enemies/chicken/chicken_normal/1_walk/3_w.png",
    ]

    constructor() {
        super().loadImage("../img/enemies/chicken/chicken_normal/1_walk/1_w.png")
        this.pos_x = 300 + Math.random() * 700
        this.loadImages(this.WALKING_SEQUENCE)
        this.animate()
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.WALKING_SEQUENCE.length
            this.currentImage = i
            let path = this.WALKING_SEQUENCE[this.currentImage]
            this.img = this.imageCache[path]
            this.currentImage++

        },1000 / 6)
    }
    
}