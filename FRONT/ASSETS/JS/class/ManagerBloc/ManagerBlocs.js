import utilsInstance from "../UTILS/Utils.js";
import Bloc from "./Bloc.js";

class ManagerBloc {
    /** @type { Bloc[] } allBlocsInstances */
    #allBlocsInstances = [];

    constructor() {
        this.Bloc = Bloc;
        this.utilsInst = utilsInstance;
        this.#allBlocsInstances = [];
    }

    /**
     * @returns { Bloc[] }
     */
    get blocInstances() {
        return this.#allBlocsInstances;
    }

    /**
     * Reinit le array des instances
     */
    blocInstancesReInit() {
        this.#allBlocsInstances = [];
    }

    /**
     * @param {number} nbOfInstances
     */
    blocsGeneration(nbOfInstances) {
        let blocInstance = null;
        /**
         * @param {number} nbIteration
         * @returns {void}
         */
        const loopRecursive = (nbIteration) => {
            if (nbIteration < nbOfInstances) {
                blocInstance = new Bloc();
                this.#allBlocsInstances.push(blocInstance);
                loopRecursive(++nbIteration);
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
