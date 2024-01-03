import utilsInstance from "../UTILS/Utils.js";
import speed from "../../../JS/class/ManagerSpeed/Speed.js";
import Canvas from "../../../JS/class/ManagerCanvas/Canvas.js";
import ManagerBloc from "../Ennemis/ManagerBlocs.js";

class ManagerPosition {
    /** @private {string} #instanceToMoveDirection */
    #instanceToMoveDirection;

    constructor(instanceToMove) {
        this.currentInstance = instanceToMove;
        this.utils = utilsInstance;
        this.speedInstancePlayer = new speed();
        this.speedInstance = new speed();

        this.speedPlayer = this.speedInstancePlayer.levelSpeed;
        this.speedInstance.valueLevel = 4;
        this.canvas = Canvas;
        this.utils.addEvListener("html", "keyup", (e) => this.changeDirection.call(this, e));
        this.valuesDirections = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
        this.#instanceToMoveDirection = this.utils.getRandomElementFromArr(this.valuesDirections);
    }

    /**
     * Change direction of #instanceToMoveDirection
     * @param {Event} e
     * @memberof ManagerPosition
     */
    changeDirection(e) {
        /** @description {Si la dir est déjà celle que l'on frappe ou que la touche frappée n'est pas une dir, on ignore} */
        if (!this.valuesDirections.includes(e.key) || this.#instanceToMoveDirection === e.key) return;
        this.#instanceToMoveDirection = e.key;
        this.updateCoordinates();
    }

    /**
     * UPDATE LES COORDs of #instanceToMoveDirection
     * @memberof ManagerPosition
     */
    updateCoordinates() {
        /** @description {On vient get les points X, Y de l'instance injecté dans le constructor} */
        let [x, y] = this.currentInstance.coordinates;

        if (this.#instanceToMoveDirection === "ArrowUp") {
            // prettier-ignore
            if (y <= 0 - (26.6 * this.canvas.canvasBox)) y = this.canvas.canvasHeight;
            y -= this.speedPlayer;
        } else if (this.#instanceToMoveDirection === "ArrowDown") {
            // prettier-ignore
            if (y >= this.canvas.canvasHeight) y = 0 - (26.6 * this.canvas.canvasBox);
            y += this.speedPlayer;
        } else if (this.#instanceToMoveDirection === "ArrowLeft") {
            // prettier-ignore
            if (x <= 0 - (26.6 * this.canvas.canvasBox)) x = this.canvas.canvasWidth;
            x -= this.speedPlayer;
        } else if (this.#instanceToMoveDirection === "ArrowRight") {
            // prettier-ignore
            if (x >= this.canvas.canvasWidth) x = 0 - (26.6 * this.canvas.canvasBox);
            x += this.speedPlayer;
        }

        /** @description {Ensuite on set les nouvelles coordonnées} */
        this.currentInstance.coordinates = [x, y];
    }

    /**
     * Permet que les blocs se rapprochent du player de manière progr
     * @param {[x: number, y: number]} coordinatesPlayer
     * @memberof ManagerPosition
     */
    updateCoordinatesAuto(coordinatesPlayer, findPlayer) {
        if (findPlayer) {
            /** @description {On vient get les points X, Y de l'instance injecté dans le constructor + ceux du player} */
            let [x, y] = this.currentInstance.coordinates;
            const [xPlayer, yPlayer] = coordinatesPlayer;

            if (xPlayer < x && xPlayer < x + this.speed) x -= this.speed;
            else if (xPlayer > x && xPlayer > x + this.speed) x += this.speed;

            if (yPlayer < y && yPlayer < y + this.speed) y -= this.speed;
            else if (yPlayer > y && yPlayer > y + this.speed) y += this.speed;

            /** @description {Ensuite on set les nouvelles coordonnées} */
            this.currentInstance.coordinates = this.limiteArea([x, y]);
            return;
        }
        let [x, y] = this.currentInstance.coordinates;

        // if (x > this.canvas.canvasWidth) x -= this.speed;
        // else if (x < 0) x += this.speed;

        // if (y < 0) y += this.speed;
        // else if (y > this.canvas.canvasHeight) y -= this.speed;

        y += this.speed;
        x -= this.speed;

        /** @description {Ensuite on set les nouvelles coordonnées} */
        this.currentInstance.coordinates = [x, y];
    }

    /**
     * Ajoute les limites
     * @param {[x: number, y: number]} param0
     * @returns {[x: number, y: number]}
     */
    limiteArea([x, y]) {
        // prettier-ignore
        if (y <= 0 - (26.6 * this.canvas.canvasBox)) y = this.canvas.canvasHeight;
        y -= this.speed;

        // prettier-ignore
        if (y >= this.canvas.canvasHeight) y = 0 - (26.6 * this.canvas.canvasBox);
        y += this.speed;

        // prettier-ignore
        if (x <= 0 - (26.6 * this.canvas.canvasBox)) x = this.canvas.canvasWidth;
        x -= this.speed;

        // prettier-ignore
        if (x >= this.canvas.canvasWidth) x = 0 - (26.6 * this.canvas.canvasBox);
        x += this.speed;

        return [x, y];
    }

    /**
     * @returns {"ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown"}
     * @memberof ManagerPosition
     */
    get instanceToMoveDirection() {
        return this.#instanceToMoveDirection;
    }
}

export default ManagerPosition;
