MOVE_LEFT = false
MOVE_RIGHT = false
JUMP = false

class Controls {
    constructor(key, pressed) {
        switch (key) {
            case "D":
                MOVE_RIGHT = pressed
                break
            case "A":
                MOVE_LEFT = pressed
                break
            case " ":
                JUMP = pressed
                break
        }
    }
}