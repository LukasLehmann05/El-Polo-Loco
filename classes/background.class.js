class Background extends Moveable_object{

    pos_y = 240

    width = 1280
    height = 720

    constructor(img_path,pos_x){
        super().loadImage(img_path)
        this.pos_x = pos_x
        this.pos_y = canvas_height - this.height 
    }
}