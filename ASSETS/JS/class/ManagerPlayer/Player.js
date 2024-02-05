import Canvas from "../ManagerCanvas/Canvas.js";
import { ManagerPosition, ManagerPositionWeapons } from "../ManagerPosition/Position.js";
import utilsInstance from "../UTILS/Utils.js";
import Speed from "../ManagerSpeed/Speed.js";
import ManagerRocket from "../ManagerRocket/ManagerRocket.js";

class Soucoupe {
    /** @private {number} #x */
    #x;
    /** @private {number} #y */
    #y;
    /** @private {string} #direction */
    #direction;
    /** @private {string} #life */
    #life;

    constructor() {
        this.speedInstance = new Speed();
        this.speedInstance.valueLevel = 4;
        this.PositionInstance = new ManagerPosition(this, this.speedInstance);
        this.managerRocketInstance = new ManagerRocket(this);
        this.utils = utilsInstance;
        this.image = null;
        this.canvas = Canvas;
        this.ctx = this.canvas.ctx;
        this.#direction;
        this.width;
        this.height;
        this.widthAndHeightDic = {
            UpDown: [70, 100],
            LeftRight: [100, 70],
        };
        this.#x = this.utils.randomMinMax(1, this.canvas.canvasWidth - 26.6);
        this.#y = this.utils.randomMinMax(1, this.canvas.canvasHeight - 26.6);
        this.#life;
    }

    /**
     * @returns {number}
     */
    get currentLife() {
        return this.#life;
    }

    /**
     * @param {number}
     */
    set currentLife(value) {
        this.#life = value;
    }

    /**
     * Retourne les nouvelles coordonnées player pour gérer les collisions
     * @returns {{ x: number, y: number, xMax: number, yMax: number }}
     */
    get newCoordinatesPlayer() {
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
    get widthAndHeight() {
        return [this.width, this.height];
    }

    /**
     * @returns {[x: number, y: number]}
     */
    get coordinates() {
        return [this.#x, this.#y];
    }

    /**
     * @returns {string}
     */
    get direction() {
        return this.#direction;
    }
    /**
     * @returns {string}
     */
    set direction(value) {
        this.#direction = value;
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
    update() {
        this.PositionInstance.updateCoordinates();
        this.direction = this.PositionInstance.direction;
        const imgName = `player_${this.direction.replace("Arrow", "").toUpperCase()}`;
        this.image = this.utils.makeImage("player", imgName);
        [this.width, this.height] = ["ArrowLeft", "ArrowRight"].includes(this.direction)
            ? this.widthAndHeightDic.LeftRight
            : this.widthAndHeightDic.UpDown;
        this.managerRocketInstance.update();
        this.draw();
    }

    /**
     * Draw the image on the canvas
     */
    draw() {
        this.ctx.drawImage(this.image, this.#x, this.#y, this.width, this.height);
    }
}

export default Soucoupe;
