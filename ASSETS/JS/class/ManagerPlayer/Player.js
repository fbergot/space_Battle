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
        this.widthAndHeightDic = [70, 100];
        this.#direction;
        this.width = this.widthAndHeightDic[0];
        this.height = this.widthAndHeightDic[1];
        this.#x = this.utils.randomMinMax(1, this.canvas.canvasWidth - 26.6);
        this.#y = this.canvas.canvasHeight - this.widthAndHeightDic[1] - 10;
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
     * Update showDamageEffect and draw on canvas player
     */
    showDamageEffect() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.#x, this.#y, this.width, this.height);
    }
    /**
     * Update position and draw on canvas player
     */
    update() {
        this.PositionInstance.updateCoordinates();
        this.image = this.utils.makeImage("player", `player_UP`);
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
