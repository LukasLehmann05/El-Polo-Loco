class Controls {
    MOVE_LEFT = false
    MOVE_RIGHT = false
    JUMP = false

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
        }
    }
}