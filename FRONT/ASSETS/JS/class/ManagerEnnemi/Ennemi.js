import Canvas from "../ManagerCanvas/Canvas.js";
import ManagerPosition from "../ManagerPosition/Position.js";
import utilsInstance from "../UTILS/Utils.js";
import Speed from "../ManagerSpeed/Speed.js";

class Ennemi {
    /** @private {number} #x */
    #x;
    /** @private {number} #y */
    #y;

    constructor() {
        this.utils = utilsInstance;
        this.speedInstance = new Speed();
        this.speedInstance.valueLevel = this.utils.randomMinMax(0.2, 2.5);
        this.managerPositionInstance = new ManagerPosition(this, this.speedInstance);
        this.image = this.utils.makeImage("ennemis", "soucoupe");
        this.widthAndHeight = [100, 54];
        this.canvas = Canvas;
        this.ctx = this.canvas.ctx;
        this.#x = this.utils.randomMinMax(-10, this.canvas.canvasWidth);
        this.#y = this.utils.randomMinMax(-10, -200);
    }

    /**
     * @returns {{ x: number, y: number, xMax: number, yMax: number }}
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
     * @param {[x: number, y: number]}
     */
    set coordinates(coordinatesXY) {
        [this.#x, this.#y] = coordinatesXY;
    }

    /**
     * @param {[x: number, y: number]} coordinatesPlayer
     */
    update(coordinatesPlayer) {
        this.managerPositionInstance.updateCoordinatesAuto(coordinatesPlayer);
        this.draw();
    }

    /** Function for draw the image on the canvas */
    draw() {
        this.ctx.drawImage(this.image, this.#x, this.#y);
    }
}

export default Ennemi;
