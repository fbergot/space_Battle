import Canvas from "../ManagerCanvas/Canvas.js";

import utilsInstance from "../UTILS/Utils.js";
import Bloc from "../Ennemis/Bloc.js";

class ManagerBloc {
    /**
     * @type { Bloc[] } allBlocsInstances
     * */
    #allBlocsInstances = [];

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

    blocsGeneration(nbOfInstances) {
        let blocInstance = null;
        const loop = (nbIteration) => {
            if (nbIteration < nbOfInstances) {
                blocInstance = new Bloc(this.makeBlocArguments());
                this.#allBlocsInstances.push(blocInstance);
                loop(nbIteration + 1);
            }
            return;
        };
        loop(0);
    }
    /**
     * @returns {{ color: string, width: number, height: number }}
     */
    makeBlocArguments() {
        const color = this.utilsInst.getRandomElementFromArr(this.colors);
        const width = this.utilsInst.randomMinMax(50, 200);
        const height = this.utilsInst.randomMinMax(50, 200);
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
        x -= speed / 2;
        return [x, y];
    }

    updateBlocs() {
        this.#allBlocsInstances.forEach((blocInstance) => {
            blocInstance.update(this.mouvementsBlocsBasic);
        });
    }
}

export default ManagerBloc;
