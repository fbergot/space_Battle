import utilsInstance from "../UTILS/Utils.js";
import Canvas from "../ManagerCanvas/Canvas.js";
import Soucoupe from "../ManagerPlayer/Player.js";
import Bloc from "../ManagerBloc/Bloc.js";
import Ennemi from "../ManagerEnnemi/Ennemi.js";
import Speed from "../ManagerSpeed/Speed.js";

export class ManagerPosition {
    /** @private {string} #direction */
    #direction;

    /**
     * @constructor
     * @param { Bloc | Soucoupe | Ennemi} instanceToMove
     * @param {Speed} speedInstance
     */
    constructor(instanceToMove, speedInstance) {
        this.currentInstance = instanceToMove;
        this.utils = utilsInstance;
        this.speedInstance = speedInstance;
        this.speed = this.speedInstance.levelSpeed;
        this.canvas = Canvas;
        this.utils.addEvListener("html", "keydown", (e) => this.changeDirection.call(this, e));
        this.valuesDirections = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
        this.#direction = this.utils.getRandomElementFromArr(
            this.valuesDirections.filter((_, index) => index < 2)
        );
    }

    /**
     * @description Change direction of #direction
     * @param {Event} e
     */
    changeDirection(e) {
        /** @description {Si la dir est déjà celle que l'on frappe ou que la touche frappée n'est pas une dir, on ignore} */
        if (!this.valuesDirections.includes(e.key) || this.#direction == e.key) return;
        this.#direction = e.key;

        if (this.currentInstance instanceof Soucoupe) this.updateCoordinates();
    }

    /**
     * UPDATE LES COORDs of #direction
     * @description {On vient get les points X, Y de l'instance injecté dans le constructor}
     */
    updateCoordinates() {
        let [x, y] = this.currentInstance.coordinates;

        if (this.#direction === "ArrowUp") {
            // prettier-ignore
            if (y <= 0 - (26.6 * this.canvas.canvasBox)) y = this.canvas.canvasHeight;
            y -= this.speed;
        } else if (this.#direction === "ArrowDown") {
            // prettier-ignore
            if (y >= this.canvas.canvasHeight) y = 0 - (26.6 * this.canvas.canvasBox);
            y += this.speed;
        } else if (this.#direction === "ArrowLeft") {
            // prettier-ignore
            if (x <= 0 - (26.6 * this.canvas.canvasBox)) x = this.canvas.canvasWidth;
            x -= this.speed;
        } else if (this.#direction === "ArrowRight") {
            // prettier-ignore
            if (x >= this.canvas.canvasWidth) x = 0 - (26.6 * this.canvas.canvasBox);
            x += this.speed;
        }

        /** @description {Ensuite on set les nouvelles coordonnées} */
        this.currentInstance.coordinates = [x, y];
    }

    /**
     * Permet que les blocs se rapprochent du player de manière progr
     * @param {[x: number, y: number]} coordinatesPlayer
     */
    updateCoordinatesAuto(coordinatesPlayer) {
        if (!this.currentInstance instanceof Ennemi) return;

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
        if (!this.currentInstance instanceof Bloc) return;
        let [x, y] = externalFunction(this.currentInstance.coordinates, this.speed);

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

        thisArg.coordinates = [x, y];
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
    get direction() {
        return this.#direction;
    }
}

export class ManagerPositionWeapons {
    /** @private {string} #direction */
    #direction;

    /**
     * @constructor
     * @param { Bloc | Soucoupe | Ennemi} instanceToMove
     */
    constructor(instanceToMove, direction) {
        this.instanceToMove = instanceToMove;
        this.#direction = direction;
        this.utils = utilsInstance;
        this.canvas = Canvas;
    }

    /**
     * UPDATE LES COORDS of #direction
     * @description {On vient get les points X, Y de l'instance injecté dans le constructor}
     */
    updateCoordinates([x, y], index) {
        switch (this.#direction) {
            case "ArrowUp":
                y -= 10;
                break;
            case "ArrowDown":
                y += 10;
                break;
            case "ArrowLeft":
                x -= 10;
                break;
            case "ArrowRight":
                x += 10;
                break;
            default:
                console.error(`Bad direction, given : ${this.#direction}`);
        }

        /** @description {Ensuite on set les nouvelles coordonnées} */
        this.instanceToMove.coordinates = [x, y];
        this.limiteArea([x, y], index);
    }

    /**
     * Ajoute les limites
     * @param {[x: number, y: number]} param0
     * @returns {[x: number, y: number]}
     */
    limiteArea([x, y], index) {
        // prettier-ignore
        if ((y <= 0 || y >= this.canvas.canvasHeight) || (x <= 0 || x >= this.canvas.canvasWidth)) {
            this.utils.$("html").dispatchEvent(
                new CustomEvent("rocketOut", {
                    detail: {
                        rocketIndex: index,
                    },
                })
            );
        }
    }

    /**
     * @returns {"ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown"}
     */
    set direction(value) {
        this.#direction = value;
    }
    /**
     * @returns {"ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown"}
     */
    get direction() {
        return this.#direction;
    }
}
