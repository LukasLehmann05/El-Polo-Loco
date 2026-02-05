class Background extends Moveable_object{

    pos_x = 0
    pos_y = 240

    width = 1280
    height = 480

    constructor(img_path){
        super().loadImage(img_path)
        this.pos_x = this.width - canvas_width
        this.pos_y = canvas_height - this.height 
    }
}