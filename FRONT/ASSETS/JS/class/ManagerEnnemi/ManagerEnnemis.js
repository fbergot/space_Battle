import Ennemi from "../ManagerEnnemi/Ennemi.js";

class ManagerEnnemis {
    /** @type { Ennemi[] } allEnnemisInstances */
    #allEnnemisInstances;

    constructor() {
        this.#allEnnemisInstances = [];
    }

    /**
     * @returns { Ennemi[] }
     */
    get ennemisInstances() {
        return this.#allEnnemisInstances;
    }

    /**
     * Reinit le array des instances
     */
    ennemisInstancesReInit() {
        this.#allEnnemisInstances = [];
    }

    /**
     * @param {number} nbOfInstances
     */
    ennemisGeneration(nbOfInstances) {
        let ennemisInstance = null;
        /**
         * @param {number} nbIteration
         * @returns {void}
         */
        const loopRecursive = (nbIteration) => {
            if (nbIteration < nbOfInstances) {
                ennemisInstance = new Ennemi();
                this.#allEnnemisInstances.push(ennemisInstance);
                loopRecursive(++nbIteration);
            }
            return;
        };
        loopRecursive(0);
    }

    /**
     * Gère le move des blocs
     */
    updateEnnemis(coordinatesPlayer) {
        this.#allEnnemisInstances.forEach((ennemiInstance) => {
            ennemiInstance.update(coordinatesPlayer);
        }, this);
    }
}

export default ManagerEnnemis;
