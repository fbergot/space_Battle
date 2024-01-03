import utilsInstance from "../UTILS/Utils.js";
import speed from "../../../JS/class/ManagerSpeed/Speed.js";
import Canvas from "../../../JS/class/ManagerCanvas/Canvas.js";
import ManagerBloc from "../Ennemis/ManagerBlocs.js";
import Soucoupe from "../Soucoupe/Soucoupe.js";
import Bloc from "../Ennemis/Bloc.js";

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
        this.utils.addEvListener("html", "keydown", (e) => this.changeDirection.call(this, e));
        this.valuesDirections = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
        this.#instanceToMoveDirection = this.utils.getRandomElementFromArr(this.valuesDirections);
    }

    /**
     * Change direction of #instanceToMoveDirection
     * @param {Event} e
     */
    changeDirection(e) {
        /** @description {Si la dir est déjà celle que l'on frappe ou que la touche frappée n'est pas une dir, on ignore} */
        if (!this.valuesDirections.includes(e.key) || this.#instanceToMoveDirection === e.key) return;
        this.#instanceToMoveDirection = e.key;
        if (this.currentInstance instanceof Soucoupe) this.updateCoordinates();
    }

    /**
     * UPDATE LES COORDs of #instanceToMoveDirection
     */
    updateCoordinates() {
        /** @description {On vient get les points X, Y de l'instance injecté dans le constructor} */
        console.log(this.currentInstance);
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
     */
    updateCoordinatesAuto(coordinatesPlayer) {
        /** @description {On vient get les points X, Y de l'instance injecté dans le constructor + ceux du player} */
        let [x, y] = this.currentInstance.coordinates;
        const [xPlayer, yPlayer] = coordinatesPlayer;

        if (xPlayer < x && xPlayer < x + this.speed) x -= this.speed;
        else if (xPlayer > x && xPlayer > x + this.speed) x += this.speed;

        if (yPlayer < y && yPlayer < y + this.speed) y -= this.speed;
        else if (yPlayer > y && yPlayer > y + this.speed) y += this.speed;

        /** @description {Ensuite on set les nouvelles coordonnées} */
        this.currentInstance.coordinates = this.limiteArea([x, y]);
    }

    /**
     * Permet que les blocs se rapprochent du player de manière progr
     * @param {[x: number, y: number]} param0
     * @param {(x: number, y: number) => [x: number, y: number]} externalFunction
     */
    updateCoordinatesAutoBlocs(thisArg, externalFunction) {
        if (this.currentInstance instanceof Bloc) {
            let [x, y] = externalFunction(this.currentInstance.coordinates, 4);

            if (y <= 0 - 26.6 * this.canvas.canvasBox) y = this.canvas.canvasHeight;
            y -= this.speedPlayer;

            // prettier-ignore
            if (y >= this.canvas.canvasHeight) y = 0 - (26.6 * this.canvas.canvasBox);
            y += this.speedPlayer;

            // prettier-ignore
            if (x <= 0 - (26.6 * this.canvas.canvasBox)) x = this.canvas.canvasWidth;
            x -= this.speedPlayer;

            // prettier-ignore
            if (x >= this.canvas.canvasWidth) x = 0 - (26.6 * this.canvas.canvasBox);
            x += this.speedPlayer;

            thisArg.coordinates = [x, y];
        }
    }

    /**
     * Ajoute les limites
     * @param {[x: number, y: number]} param0
     * @returns {[x: number, y: number]}
     */
    limiteArea([x, y]) {
        // prettier-file-ignore
        if (y <= 0 - 26.6 * this.canvas.canvasBox) y = this.canvas.canvasHeight;
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
     */
    get instanceToMoveDirection() {
        return this.#instanceToMoveDirection;
    }
}

export default ManagerPosition;
