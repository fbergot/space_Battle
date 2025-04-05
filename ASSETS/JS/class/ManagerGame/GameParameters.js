import Bloc from "../ManagerBloc/Bloc.js";
import Ennemi from "../ManagerEnnemi/Ennemi.js";
import utilsInstance from "../UTILS/Utils.js";

class GameParameters {
    /**
     * @param {number} startLifePlayer
     * @param { { managerBlocInstance: Bloc, managerEnnemisInstance: Ennemi, managerRocketInstance: Rocket } } param1
     */
    constructor(startLifePlayer, { managerBlocInstance, managerEnnemisInstance, managerRocketInstance }) {
        this.startLifePlayer = startLifePlayer;
        this.utils = utilsInstance;
        this.lifeHTML = this.utils.$("#collision");
        this.lifeHTML.innerText = this.startLifePlayer;
        this.ennemisHTML = this.utils.$("#ennemis");

        this.utils.addEvListener(
            "html",
            "collision",
            (e) => {
                managerRocketInstance.instancesPop(e.detail.rocketIndex);
                this.lifeFunc.call(this, e);

                if (e.detail.typeOfEnnemi === "bloc") {
                    const currentBloc = managerBlocInstance.instances[e.detail.ennemiIndex];
                    currentBloc.life = currentBloc.life - e.detail.rocketDamage;
                    if (currentBloc.life <= 0) {
                        managerBlocInstance.instancesPop(e.detail.ennemiIndex);
                        // this.ennemisFunc.call(this, e);
                    }
                }

                if (["soucoupe", "fusee"].includes(e.detail.typeOfEnnemi)) {
                    const currentEnnemi = managerEnnemisInstance.instances[e.detail.ennemiIndex];
                    currentEnnemi.life = currentEnnemi.life - e.detail.rocketDamage;
                    if (currentEnnemi.life <= 0) {
                        managerEnnemisInstance.instancesPop(e.detail.ennemiIndex);
                        // this.ennemisFunc.call(this, e);
                    }
                }
            },
            { once: false },
        );
    }

    /**
     *
     * @param {Event} e
     */
    // ennemisFunc(e) {
    //     --this.nbEnnemisInLive;
    //     this.ennemisHTML.innerText = this.nbEnnemisInLive;
    //     // this.utils.displayEnnemis(this.nbEnnemisInLive);
    // }

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
