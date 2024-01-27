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
     * @returns { Bloc instanceOf Bloc[] }
     */
    get instances() {
        return this.#allBlocsInstances;
    }

    /**
     * Reinit le array des instances
     */
    instancesReInit() {
        this.#allBlocsInstances = [];
    }

    /**
     * @param {number} index
     */
    instancesPop(index) {
        this.#allBlocsInstances = this.#allBlocsInstances.filter((bloc, i) => {
            console.log(i, index);
            return i != index;
        });
    }

    /**
     * Génère les blocs
     * @param {number} nbOfInstances
     */
    generation(nbOfInstances) {
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
     * @param {string} direction
     * @returns {[x: number, y: number]}
     */
    mouvementsBlocsBasic([x, y], speed, direction = "top_bottom") {
        if (["top_bottom", "all"].includes(direction)) {
            y += speed;
        }
        if (["left_right", "all"].includes(direction)) {
            x += speed;
        }
        // x -= speed;
        return [x, y];
    }

    /**
     * Gère le move des blocs
     */
    update() {
        this.#allBlocsInstances.forEach((blocInstance) => {
            blocInstance.update(this.mouvementsBlocsBasic);
        }, this);
    }
}

export default ManagerBloc;
