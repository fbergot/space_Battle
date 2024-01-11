import Canvas from "../ManagerCanvas/Canvas.js";
import Position from "../ManagerPosition/Position.js";
import utilsInstance from "../UTILS/Utils.js";
import Speed from "../ManagerSpeed/Speed.js";

class Soucoupe {
    /** @private {number} #x */
    #x;
    /** @private {number} #y */
    #y;

    constructor() {
        this.speedInstance = new Speed(2);
        this.utils = utilsInstance;
        this.PositionInstance = new Position(this, this.speedInstance);
        this.image = null;
        this.canvas = Canvas;
        this.ctx = this.canvas.ctx;
        this.#x = this.utils.randomMinMax(1, this.canvas.canvasWidth - 26.6);
        this.#y = this.utils.randomMinMax(1, this.canvas.canvasHeight - 26.6);
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
     * Update positions and draw on Canvas.
     */
    update() {
        this.PositionInstance.updateCoordinates();
        const direction = this.PositionInstance.instanceToMoveDirection;
        const imgName = `player_${direction.replace("Arrow", "").toUpperCase()}`;
        this.image = this.utils.makeImage("player", imgName);
        this.draw();
    }

    /**
     * Draw the image on the canvas
     */
    draw() {
        this.ctx.drawImage(
            this.image,
            this.#x,
            this.#y,
            26.6 * this.canvas.canvasBox,
            26.6 * this.canvas.canvasBox
        );
    }
}

export default Soucoupe;
