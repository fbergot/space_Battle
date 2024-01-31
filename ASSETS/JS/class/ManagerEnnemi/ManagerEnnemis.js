import Ennemi from "../ManagerEnnemi/Ennemi.js";

class ManagerEnnemis {
    /**
     * @type { Ennemi[] } allEnnemisInstances
     * @private
     */
    #allEnnemisInstances;

    constructor() {
        this.#allEnnemisInstances = [];
    }

    /**
     * @returns { Ennemi instanceOf Ennemi[] }
     */
    get instances() {
        return this.#allEnnemisInstances;
    }

    /**
     * Reinit le array des instances
     */
    instancesReInit() {
        this.#allEnnemisInstances = [];
    }

    /**
     * @param {number} index
     */
    instancesPop(index) {
        this.#allEnnemisInstances = this.#allEnnemisInstances.filter((_, i) => i != index);
    }

    /**
     * Génère les ennemis
     * @param {number} nbOfInstances
     */
    generation(nbOfInstances) {
        /**
         * @param {number} nbIterations
         * @returns {void}
         */
        const loopRecursive = (nbIterations = 0) => {
            if (nbIterations < nbOfInstances) {
                this.#allEnnemisInstances.push(new Ennemi());
                loopRecursive(++nbIterations);
            }
            return;
        };
        loopRecursive();
    }

    /**
     * Gère le move des ennemis
     * @param {[x: number, y: number]} coordinatesPlayer
     */
    update(coordinatesPlayer) {
        this.#allEnnemisInstances.forEach((ennemiInstance) => {
            ennemiInstance.update(coordinatesPlayer);
        }, this);
    }
}

export default ManagerEnnemis;
