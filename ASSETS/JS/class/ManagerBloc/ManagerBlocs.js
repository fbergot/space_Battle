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
        this.#allBlocsInstances = this.#allBlocsInstances.filter((bloc, i) => i != index);
    }

    /**
     *
     * @param {Bloc} instance
     * @param {{ ennemis: {nb: number, type: string, life: number}, player: {rockets: {nb : number, damage: number}}}} dataCurrentLevel
     */
    initParametersInstance(Bloc, dataCurrentLevel) {
        const blocInstance = new Bloc();
        blocInstance.life = dataCurrentLevel.ennemis.life;
        return blocInstance;
    }

    /**
     * Génère les blocs
     * @param {number} nbOfInstances
     */
    generation(dataCurrentLevel) {
        /**
         * @param {number} nbIterations
         * @returns {void}
         */
        const loopRecursive = (nbIterations = 0) => {
            if (nbIterations < dataCurrentLevel.ennemis.nb) {
                const blocInstance = this.initParametersInstance(Bloc, dataCurrentLevel);
                this.#allBlocsInstances.push(blocInstance);

                loopRecursive(++nbIterations);
            }
            return;
        };
        loopRecursive();
        console.log(this.#allBlocsInstances);
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
