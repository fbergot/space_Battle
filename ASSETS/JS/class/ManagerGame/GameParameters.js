import utilsInstance from "../UTILS/Utils.js";

class GameParameters {
    constructor(startLife, { managerBlocInstance, managerEnnemisInstance }) {
        this.lifesPlayer = startLife;
        this.utilsInstance = utilsInstance;
        this.lifeHTML = this.utilsInstance.$("#life");
        this.lifeHTML.innerText = this.lifesPlayer;
        this.scoreHTML = this.utilsInstance.$("#score");
        this.scoreHTML.innerText = 0;

        document.addEventListener(
            "collision",
            (e) => {
                lifeFunc.call(this, e);
                managerBlocInstance.instancesPop(e.detail.ennemiIndex);
                managerEnnemisInstance.instancesPop(e.detail.ennemiIndex);
            },
            { once: false }
        );

        function lifeFunc(e) {
            ++this.lifesPlayer;
            this.lifeHTML.innerText = this.lifesPlayer;
        }
    }
}

export default GameParameters;
