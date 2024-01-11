import utilsInstance from "../UTILS/Utils.js";
import Bloc from "./Bloc.js";

class ManagerBloc {
    /**
     * @type { Bloc[] } allBlocsInstances
     * @private
     */
    #allBlocsInstances = [];

    constructor() {
        this.utilsInst = utilsInstance;
        this.#allBlocsInstances = [];
    }

    /**
     * @returns { Bloc[] }
     */
    get instances() {
        return this.#allBlocsInstances;
    }

    /**
     * Reinit le array des instances
     */
    blocInstancesReInit() {
        this.#allBlocsInstances = [];
    }

    /**
     * Génère les blocs
     * @param {number} nbOfInstances
     */
    blocsGeneration(nbOfInstances) {
        /**
         * @param {number} nbIterations
         * @returns {void}
         */
        const loopRecursive = (nbIterations) => {
            if (nbIterations < nbOfInstances) {
                this.#allBlocsInstances.push(new Bloc());
                loopRecursive(++nbIterations);
            }
            return;
        };
        loopRecursive(0);
    }

    /**
     * Ajoute les limites
     * @param {[x: number, y: number]} param0
     * @param {number} speed
     * @returns {[x: number, y: number]}
     */
    mouvementsBlocsBasic([x, y], speed) {
        y += speed;
        x -= speed;
        return [x, y];
    }

    /**
     * Gère le move des blocs
     */
    updateBlocs() {
        this.#allBlocsInstances.forEach((blocInstance) => {
            blocInstance.update(this.mouvementsBlocsBasic);
        }, this);
    }
}

export default ManagerBloc;
