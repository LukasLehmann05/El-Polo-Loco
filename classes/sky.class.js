class Sky extends Moveable_object {
    constructor(sky_image) {
        super().loadImage(sky_image)
        this.pos_x = 0
        this.pos_y = 0
        this.width = canvas_width
        this.height = canvas_height
    }
}