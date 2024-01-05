import Canvas from "../ManagerCanvas/Canvas.js";
import ManagerPosition from "../ManagerPosition/Position.js";
import utilsInstance from "../UTILS/Utils.js";
import Speed from "../ManagerSpeed/Speed.js";

class Ennemi {
    /** @private {number} #x */
    #x;
    /** @private {number} #y */
    #y;

    /**
     * @constructor
     * @param {number} speed
     */
    constructor() {
        this.utils = utilsInstance;
        this.speedInstance = new Speed();
        this.managerPositionInstance = new ManagerPosition(this, this.speedInstance);
        this.speedInstance.valueLevel = this.utils.randomMinMax(1, 4);
        this.image = this.utils.makeImage("ennemis", "soucoupe");
        this.canvas = Canvas;
        this.ctx = this.canvas.ctx;
        this.#x = this.utils.randomMinMax(-10, this.canvas.canvasWidth);
        this.#y = this.utils.randomMinMax(-10, this.canvas.canvasHeight);
        this.nbInstance = 0;
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
