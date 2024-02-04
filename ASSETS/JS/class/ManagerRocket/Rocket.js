import Canvas from "../ManagerCanvas/Canvas.js";
import { ManagerPositionWeapons } from "../ManagerPosition/Position.js";
import utilsInstance from "../UTILS/Utils.js";
import ManagerRocket from "./ManagerRocket.js";

class Rocket {
    /** @private {number} #x */
    #x;
    /** @private {number} #y */
    #y;

    constructor(instanceNeedRocket, direction) {
        this.direction = direction;
        this.instanceNeedRocket = instanceNeedRocket;
        this.utils = utilsInstance;
        this.canvas = Canvas;
        this.widthAndHeightDic = {
            UpDown: [25, 70],
            LeftRight: [70, 25],
        };
        this.ctx = this.canvas.ctx;
        this.#x = 0;
        this.#y = 0;
        this.managerPositionWeapons = new ManagerPositionWeapons(this, this.direction);
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
     * @param {ManagerRocket}
     */
    set managerRocketInstance(instance) {
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
