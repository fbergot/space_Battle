import Canvas from "../ManagerCanvas/Canvas.js";
import ManagerPosition from "../ManagerPosition/ManagerPosition.js";
import utilsInstance from "../UTILS/Utils.js";

class ManagerBloc {
    /** @private {number} #x */
    #x;
    /** @private {number} #y */
    #y;

    constructor(params) {
        this.canvas = Canvas;
        this.ctx = Canvas.ctx;
        this.color = params.color;
        this.width = params.width;
        this.heigth = params.heigth;
        this.utils = utilsInstance;
        this.#x = 100;
        this.#y = 200;
        this.managerPositionInstance = new ManagerPosition(this);
    }

    update(playerCoordinates) {
        // this.managerPositionInstance.updateCoordinatesAuto(playerCoordinates);
        this.draw();
    }

    /** Function for draw the bloc on the canvas */
    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#ddd";
        this.ctx.strokeRect(this.#x, this.#y, this.width, this.heigth);
        // this.ctx.strokeRect(this.#x, this.#y, this.width, this.heigth);
        this.ctx.closePath();
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
}

export default ManagerBloc;
