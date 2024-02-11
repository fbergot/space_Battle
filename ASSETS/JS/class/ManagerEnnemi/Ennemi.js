import Canvas from "../ManagerCanvas/Canvas.js";
import { ManagerPosition } from "../ManagerPosition/Position.js";
import utilsInstance from "../UTILS/Utils.js";
import Speed from "../ManagerSpeed/Speed.js";
import ManagerRocket from "../ManagerRocket/ManagerRocket.js";

class Ennemi {
    /** @private {number} #x */
    #x;
    /** @private {number} #y */
    #y;
    /** @private {number} #life */
    #life;

    constructor(type) {
        this.canvas = Canvas;
        this.ctx = this.canvas.ctx;
        this.utils = utilsInstance;
        this.speedInstance = new Speed();
        this.speedInstance.valueLevel = this.utils.randomMinMax(0.5, 3.5);
        this.managerPositionInstance = new ManagerPosition(this, this.speedInstance);
        // this.managerRocketInstance = new ManagerRocket(this);
        this.image = this.utils.makeImage("ennemis", type);
        this.widthAndHeight;
        this.width = 100;
        this.height = 54;
        this.#x = this.utils.randomMinMax(-10, this.canvas.canvasWidth);
        this.#y = this.utils.randomMinMax(-10, -200);
        this.#life;
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
     * @returns {number}
     */
    get life() {
        return this.#life;
    }

    /**
     * @param {number}
     */
    set life(value) {
        this.#life = value;
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
    update(coordinatesPlayer, index) {
        this.managerPositionInstance.updateCoordinatesAuto(coordinatesPlayer, index);
        // this.managerRocketInstance.update();
        this.draw();
    }

    /** Function for draw the image on the canvas */
    draw() {
        this.ctx.drawImage(this.image, this.#x, this.#y);
    }
}

export default Ennemi;
