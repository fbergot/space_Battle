import Canvas from "../ManagerCanvas/Canvas.js";
import { ManagerPositionWeapons } from "../ManagerPosition/Position.js";
import utilsInstance from "../UTILS/Utils.js";
import ManagerRocket from "./ManagerRocket.js";

class Rocket {
    /** @private {number} #x */
    #x;
    /** @private {number} #y */
    #y;
    /** @private {number} #damage */
    #damage;

    constructor(instanceNeedRocket, direction) {
        this.direction = direction;
        this.managerPositionWeapons = new ManagerPositionWeapons(this, this.direction);
        this.instanceNeedRocket = instanceNeedRocket;
        this.utils = utilsInstance;
        this.canvas = Canvas;
        this.widthAndHeightDic = [25, 70];
        this.width = this.widthAndHeightDic[0];
        this.height = this.widthAndHeightDic[1];
        this.ctx = this.canvas.ctx;
        this.#x = 0;
        this.#y = 0;
        this.#damage;
    }

    /**
     * @returns {number}
     */
    get currentDamage() {
        return this.#damage;
    }

    /**
     * @param {number}
     */
    set currentDamage(value) {
        this.#damage = value;
    }

    /**
     * @returns {{ x: number, y: number, xMax: number, yMax: number }}
     */
    get coordinatesWithWidthAndHeight() {
        return {
            x: this.#x,
            y: this.#y,
            xMax: this.#x + this.width,
            yMax: this.#y + this.height,
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
     * Update position and draw on canvas player
     */
    update(index) {
        this.managerPositionWeapons.updateCoordinates(this.coordinates, index);
        this.image = this.utils.makeImage("rocket", `rocket_UP`);
        this.draw();
    }

    /** Function for draw the image on the canvas */
    draw() {
        // console.log({ img: this.image, x: this.#x, y: this.#y, width: this.width, heigth: this.height });
        this.ctx.drawImage(this.image, this.#x, this.#y, this.width, this.height);
    }
}

export default Rocket;
