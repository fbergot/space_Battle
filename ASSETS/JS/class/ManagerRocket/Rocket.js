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
        this.width;
        this.height;
        this.widthAndHeightDic = {
            UpDown: [25, 70],
            LeftRight: [70, 25],
        };
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
        const direction = this.direction;
        const imgName = `rocket_${direction.replace("Arrow", "").toUpperCase()}`;
        this.image = this.utils.makeImage("rocket", imgName);
        [this.width, this.height] = ["ArrowLeft", "ArrowRight"].includes(direction)
            ? this.widthAndHeightDic.LeftRight
            : this.widthAndHeightDic.UpDown;
        this.draw();
    }

    /** Function for draw the image on the canvas */
    draw() {
        this.ctx.drawImage(this.image, this.#x, this.#y, this.width, this.height);
    }
}

export default Rocket;
