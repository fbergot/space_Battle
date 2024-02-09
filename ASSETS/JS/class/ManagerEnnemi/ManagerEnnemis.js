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
     * @param {Ennemi} instance
     * @param {{ ennemis: {nb: number, type: string, life: number}, player: {rockets: {nb : number, damage: number}}}} dataCurrentLevel
     */
    createAndInitParamsInstance(Ennemi, dataCurrentLevel) {
        const ennemiInstance = new Ennemi(dataCurrentLevel.ennemis.type);
        ennemiInstance.life = dataCurrentLevel.ennemis.life;
        ennemiInstance.widthAndHeight = dataCurrentLevel.ennemis.widthAndHeight;
        return ennemiInstance;
    }

    /**
     * Génère les ennemis
     * @param {number} nbOfInstances
     */
    generation(dataCurrentLevel) {
        /**
         * @param {number} nbIterations
         * @returns {void}
         */
        const loopRecursive = (nbIterations = 0) => {
            if (nbIterations < dataCurrentLevel.ennemis.nb) {
                const ennemiInstance = this.createAndInitParamsInstance(Ennemi, dataCurrentLevel);
                this.#allEnnemisInstances.push(ennemiInstance);

                loopRecursive(++nbIterations);
            }
            return;
        };
        loopRecursive();
        console.log(this.#allEnnemisInstances);
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
