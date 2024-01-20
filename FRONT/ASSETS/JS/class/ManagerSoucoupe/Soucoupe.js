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
        this.speedInstance = new Speed();
        this.speedInstance.valueLevel = 4;
        this.utils = utilsInstance;
        this.PositionInstance = new Position(this, this.speedInstance);
        this.image = null;
        this.canvas = Canvas;
        this.ctx = this.canvas.ctx;
        this.width;
        this.height;
        this.widthAndHeightDic = {
            UpDown: [70, 100],
            LeftRight: [100, 70],
        };
        this.#x = this.utils.randomMinMax(1, this.canvas.canvasWidth - 26.6);
        this.#y = this.utils.randomMinMax(1, this.canvas.canvasHeight - 26.6);
    }

    /**
     * @returns
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
        const direction = this.PositionInstance.instanceToMoveDirection;
        const imgName = `player_${direction.replace("Arrow", "").toUpperCase()}`;
        this.image = this.utils.makeImage("player", imgName);
        [this.width, this.height] = ["ArrowLeft", "ArrowRight"].includes(direction)
            ? this.widthAndHeightDic.LeftRight
            : this.widthAndHeightDic.UpDown;
        // console.log([this.width, this.height]);
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
