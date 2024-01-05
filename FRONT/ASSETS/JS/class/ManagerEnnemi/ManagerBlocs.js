import utilsInstance from "../UTILS/Utils.js";
import Bloc from "./Bloc.js";

class ManagerBloc {
    /** @type { Bloc[] } allBlocsInstances */
    #allBlocsInstances = [];

    /**
     * @constructor
     */
    constructor() {
        this.Bloc = Bloc;
        this.colors = ["#FFF", "#ADF", "blue"];
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
                blocInstance = new Bloc(this.makeBlocArguments());
                this.#allBlocsInstances.push(blocInstance);
                loopRecursive(nbIteration + 1);
            }
            return;
        };
        loopRecursive(0);
    }

    /**
     * @returns {{ color: string, width: number, height: number }}
     */
    makeBlocArguments() {
        const color = this.utilsInst.getRandomElementFromArr(this.colors);
        const width = this.utilsInst.randomMinMax(10, 150);
        const height = this.utilsInst.randomMinMax(10, 100);
        return { color, width, height };
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