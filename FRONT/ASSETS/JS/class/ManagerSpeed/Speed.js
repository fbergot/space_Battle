import Canvas from "../ManagerCanvas/Canvas.js";
import utilsInstance from "../UTILS/Utils.js";

class Speed {
    /** @private {number} #level */
    #level;
    /** @private {number} #speed */
    #speed;

    constructor(level) {
        this.utils = utilsInstance;
        this.canvas = Canvas;
        this.canvasBox = this.canvas.canvasBox;
        this.#level = level ? level : this.utils.randomMinMax(1, 5);
        this.setSpeed = () => (this.#speed = this.#level * this.canvasBox);
        this.#speed = this.setSpeed();
    }

    /**
     * Change level of speed
     * @param {number} level
     * @memberof Speed
     */
    set valueLevel(level) {
        const errorStr = `Le level doit être un nombre. given: ${typeof level}`;
        typeof level !== "number" && console.error(errorStr);
        this.#level = level;
        this.setSpeed();
    }

    /**
     * @returns {number}
     */
    get levelSpeed() {
        return this.#speed;
    }
}

export default Speed;
