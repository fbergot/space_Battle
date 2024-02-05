import utils from "./../UTILS/Utils.js";
import Rocket from "./Rocket.js";

class ManagerRocket {
    /**
     * @type { Rocket[] } allRocketsInstances
     * @private
     */
    #allRocketsInstances = [];

    constructor(instanceNeedRockets) {
        this.instanceNeedRockets = instanceNeedRockets;
        this.utils = utils;
        this.utils.addEvListener("html", "keyup", (e) => {
            if (e.keyCode === 32) {
                this.generation.call(this, this.instanceNeedRockets.direction);
                // console.log(this.#allRocketsInstances);
            }
        });

        this.#allRocketsInstances = [];
        document.addEventListener("rocketOut", (e) => {
            this.instancesPop.call(this, e.detail.rocketIndex);
            // console.log(this.#allRocketsInstances);
        });
    }

    /**
     * @returns { Rocket[] }
     */
    get instances() {
        return this.#allRocketsInstances;
    }

    /**
     * Reinit le array des instances
     */
    instancesReInit() {
        this.#allRocketsInstances = [];
    }

    /**
     * @param {number} index
     */
    instancesPop(index) {
        this.#allRocketsInstances = this.#allRocketsInstances.filter((bloc, i) => {
            return i != index;
        });
    }

    /**
     * Génère les Rockets
     * @param {Event} e
     */
    generation(direction) {
        const rocket = new Rocket(this.instanceNeedRockets, direction);
        let [x, y] = this.instanceNeedRockets.coordinates;
        if (["ArrowUp", "ArrowDown"].includes(direction)) {
            rocket.coordinates = [x + (this.instanceNeedRockets.width / 2 - rocket.width / 2), y];
        } else if (["ArrowLeft", "ArrowRight"].includes(direction)) {
            rocket.coordinates = [x, y + (this.instanceNeedRockets.height / 2 - rocket.height / 2)];
        }
        this.#allRocketsInstances.push(rocket);
        // console.log(this.#allRocketsInstances, direction);
    }

    /**
     * Gère le move des Rocket
     */
    update() {
        this.#allRocketsInstances.forEach((rocketInstance, index) => {
            rocketInstance.update(index);
        }, this);
    }
}

export default ManagerRocket;
