import Bloc from "../ManagerBloc/Bloc.js";
import Ennemi from "../ManagerEnnemi/Ennemi.js";
import utilsInstance from "../UTILS/Utils.js";
import { levelsData } from "../../config/levelsData.js";

class GameParameters {
    /**
     *
     * @param {number} startLife
     * @param { { managerBlocInstance: Bloc, managerEnnemisInstance: Ennemi } } param1
     */
    constructor(startLife, { managerBlocInstance, managerEnnemisInstance }) {
        this.lifesPlayer = startLife;
        this.utils = utilsInstance;
        this.lifeHTML = this.utils.$("#collision");
        this.lifeHTML.innerText = this.lifesPlayer;
        this.ennemisHTML = this.utils.$("#ennemis");

        document.addEventListener(
            "setEnnemis",
            (e) => {
                this.ennemisHTML.innerText = e.detail.nbEnnemis;
                this.nbEnnemisInLive = e.detail.nbEnnemis;
            },
            { once: false }
        );

        document.addEventListener(
            "collision",
            (e) => {
                this.lifeFunc.call(this, e);
                managerBlocInstance.instancesPop(e.detail.ennemiIndex);
                managerEnnemisInstance.instancesPop(e.detail.ennemiIndex);
                this.ennemisFunc.call(this, e);
            },
            { once: false }
        );
    }

    /**
     *
     * @param {Event} e
     */
    ennemisFunc(e) {
        --this.nbEnnemisInLive;
        this.ennemisHTML.innerText = this.nbEnnemisInLive;
    }

    /**
     *
     * @param {Event} e
     */
    lifeFunc(e) {
        ++this.lifesPlayer;
        this.lifeHTML.innerText = this.lifesPlayer;
    }
}

export default GameParameters;
