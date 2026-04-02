/**
 * @file controls.class.js
 * @description Contains control input data for the game to be displayed.
 */
class Controls {
    MOVE_LEFT = false
    MOVE_RIGHT = false
    JUMP = false
    THROW = false

    canControl = false

    /**
     * Class initialization.
     */
    constructor() {
    }

    /**
     * Handles key input.
     * @param {string} key The key that was pressed or released.
     * @param {boolean} pressed Whether the key was pressed (true) or released (false).
     */
    handleKey(key, pressed) {
        if (this.canControl) {
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

    resetControls() {
        this.MOVE_LEFT = false
        this.MOVE_RIGHT = false
        this.JUMP = false
        this.THROW = false
    }
}
