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
     * @returns { Ennemi[] }
     */
    get instances() {
        return this.#allEnnemisInstances;
    }

    /**
     * Reinit le array des instances
     */
    ennemisInstancesReInit() {
        this.#allEnnemisInstances = [];
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
        const loopRecursive = (nbIterations) => {
            if (nbIterations < nbOfInstances) {
                this.#allEnnemisInstances.push(new Ennemi());
                loopRecursive(++nbIterations);
            }
            return;
        };
        loopRecursive(0);
    }

    /**
     * Gère le move des ennemis
     * @param {[x: number, y: number]} coordinatesPlayer
     */
    updateEnnemis(coordinatesPlayer) {
        this.#allEnnemisInstances.forEach((ennemiInstance) => {
            ennemiInstance.update(coordinatesPlayer);
        }, this);
    }
}

export default ManagerEnnemis;
