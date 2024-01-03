import Canvas from "../ManagerCanvas/Canvas.js";
import utilsInstance from "../UTILS/Utils.js";
import ManagerPosition from "../ManagerPosition/ManagerPosition.js";

class Bloc {
    /** @private {number} #x */
    #x;
    /** @private {number} #y */
    #y;

    constructor({ color, width, height }) {
        this.canvas = Canvas;
        this.ctx = Canvas.ctx;
        this.color = color;
        this.width = width;
        this.height = height;
        this.utils = utilsInstance;
        this.#x = this.utils.randomMinMax(5, this.canvas.canvasWidth);
        this.#y = -120;
        this.managerPositionInstance = new ManagerPosition(this);
    }

    update(externalFunction) {
        this.managerPositionInstance.updateCoordinatesAutoBlocs(this, externalFunction);
        this.draw();
    }

    /** Function for draw the bloc on the canvas */
    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.#x, this.#y, this.width, this.height);
        // this.ctx.strokeRect(this.#x, this.#y, this.width, this.height);
        this.ctx.closePath();
    }

    /**
     * @returns {[x: number, y: number]}
     */
    get coordinates() {
        return [this.#x, this.#y];
    }

    /**
     * @param {[x: number, y: number]} coordinatesXY
     */
    set coordinates(coordinatesXY) {
        [this.#x, this.#y] = coordinatesXY;
    }

    /**
     * @param {[width: string, height: string]} newValues
     */
    set setWidthAndHeight(newValues) {
        [this.width, this.height] = newValues;
    }
}

export default Bloc;
