import utilsInstance from "../UTILS/Utils.js";

class GameParameters {
    constructor(startLife, { managerBlocInstance, managerEnnemisInstance }) {
        this.lifesPlayer = startLife;
        this.utils = utilsInstance;
        this.lifeHTML = this.utils.$("#life");
        this.lifeHTML.innerText = this.lifesPlayer;

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
            const wording = (nb, word) => `${nb} ${this.utils.plural(word, nb)}`;
            ++this.lifesPlayer;
            this.lifeHTML.innerText = wording(this.lifesPlayer, "Collision");
        }
    }
}

export default GameParameters;
