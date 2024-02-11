import Ennemi from "../ManagerEnnemi/Ennemi.js";
import utils from "./../UTILS/Utils.js";
import Rocket from "./Rocket.js";

class ManagerRocket {
    /**
     * @type { Rocket[] } allRocketsInstances
     * @private
     */
    #allRocketsInstances = [];
    #currentDamage;

    constructor(instanceNeedRockets) {
        this.instanceNeedRockets = instanceNeedRockets;
        this.#allRocketsInstances = [];
        this.#currentDamage;
        this.utils = utils;
        this.currentLevel;
        this.timeLastRocket;
        this.utils.addEvListener("html", "keyup", (e) => {
            if (e.keyCode === 32) {
                this.generation.call(this);
            }
        });
        // if (instanceNeedRockets.constructor.name !== "Ennemi") {
        // }

        /**
         * this.utils.addEvListener("html", "targetingPlayer", (e) => {
                this.timeLastRocket = e.detail.time;
                console.log(this.timeLastRocket + 1000 < new Date().getTime());
                if (this.timeLastRocket + 1000 > new Date().getTime()) {
                    const valuesDirections = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
                    const direction = this.utils.getRandomElementFromArr(valuesDirections);
                    this.generation.call(this, direction, e.detail.index);
                }
            });
         */

        this.utils.addEvListener("html", "rocketOut", (e) => {
            this.instancesPop.call(this, e.detail.rocketIndex);
        });
    }

    /**
     * @returns {number}
     */
    get level() {
        return this.currentLevel;
    }

    /**
     * @param {number} value
     */
    set level(value) {
        this.currentLevel = value;
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
     * @param {number} value
     */
    set currentDamage(value) {
        this.#currentDamage = value;
    }

    /**
     * @returns {number}
     */
    get currentDamage() {
        return this.#currentDamage;
    }

    /**
     *
     * @param {Bloc} instance
     * @param {{ ennemis: {nb: number, type: string, life: number}, player: {rockets: {nb : number, damage: number}}}} dataCurrentLevel
     */
    initParametersInstance(instance, dataCurrentLevel) {
        instance.currentDamage = dataCurrentLevel.player.rockets.damage;
    }

    /**
     * Génère les Rockets
     * @param {Event} e
     */
    generation() {
        const rocket = new Rocket(this.instanceNeedRockets);
        let [x, y] = this.instanceNeedRockets.coordinates;
        rocket.coordinates = [x + (this.instanceNeedRockets.width / 2 - rocket.width / 2), y];
        rocket.currentDamage = this.currentDamage;
        this.#allRocketsInstances.push(rocket);
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
