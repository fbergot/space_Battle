import utilsInstance from "../UTILS/Utils.js";

class GameParameters {
    constructor(startLife) {
        this.lifesPlayer = startLife;
        this.utilsInstance = utilsInstance;
        this.lifeHTML = this.utilsInstance.$("#life");
        this.lifeHTML.innerText = this.lifesPlayer;
        this.scoreHTML = this.utilsInstance.$("#score");
        this.scoreHTML.innerText = 0;

        document.addEventListener("collision", (e) => lifeFunc.call(this, e), { once: false });

        function lifeFunc(e) {
            ++this.lifesPlayer;
            this.lifeHTML.innerText = this.lifesPlayer;
        }
    }
}

export default GameParameters;
