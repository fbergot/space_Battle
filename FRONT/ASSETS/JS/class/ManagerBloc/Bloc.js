import Canvas from "../ManagerCanvas/Canvas.js";
import utilsInstance from "../UTILS/Utils.js";
import ManagerPosition from "../ManagerPosition/Position.js";
import Speed from "../ManagerSpeed/Speed.js";

class Bloc {
    /** @private {number} #x */
    #x;
    /** @private {number} #y */
    #y;

    constructor() {
        this.colors = ["#FFF", "#ADF", "blue", "#AAF", "#FFF", "red"];
        this.utils = utilsInstance;
        this.speedInstance = new Speed();
        this.speedInstance.valueLevel = this.utils.randomMinMax(0.8, 1.2);
        this.canvas = Canvas;
        this.ctx = Canvas.ctx;
        this.color = this.utils.getRandomElementFromArr(this.colors);
        this.width = this.utils.randomMinMax(100, 150);
        this.height = this.utils.randomMinMax(100, 150);
        this.widthAndHeight = [this.width, this.height];
        this.#x = this.utils.randomMinMax(5, this.canvas.canvasWidth);
        this.#y = this.utils.randomMinMax(0, 500);
        this.managerPositionInstance = new ManagerPosition(this, this.speedInstance);
    }

    /**
     * Upadte la position des blocs
     * @param {([x: number, y: number], number) => [x: number, y: number]} externalFunction
     */
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
     * @returns {{ xEnn: number, yEnn: number, xEnnMax: number, yEnnMax: number }}
     */
    get coordinatesWithWidthAndHeight() {
        return {
            xEnn: this.#x,
            yEnn: this.#y,
            xEnnMax: this.#x + this.widthAndHeight[0],
            yEnnMax: this.#y + this.widthAndHeight[1],
        };
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
}

export default Bloc;
