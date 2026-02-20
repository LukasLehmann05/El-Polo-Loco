class Controls {
    MOVE_LEFT = false
    MOVE_RIGHT = false
    JUMP = false
    THROW = false

    constructor() {
    }

    handleKey(key, pressed) {
        switch (key) {
            case "D":
                this.MOVE_RIGHT = pressed
                break
            case "A":
                this.MOVE_LEFT = pressed
                break
            case "SPACE":
                this.JUMP = pressed
                break
            case "F":
                this.THROW = pressed
                break
        }
    }
}