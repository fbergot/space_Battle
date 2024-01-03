import Canvas from "../ManagerCanvas/Canvas.js";
import utilsInstance from "../UTILS/Utils.js";
import Soucoupe from "../Soucoupe/Soucoupe.js";
import ManagerPositionInstance from "../ManagerPosition/ManagerPosition.js";
import ManagerBloc from "../Ennemis/ManagerBlocs.js";

class Game {
    constructor() {
        this.canvas = Canvas;
        this.ctx = Canvas.ctx;
        this.timer = null;
        this.utils = utilsInstance;
        this.managerBlocInstance = new ManagerBloc();
        this.managerPositionInstance = new ManagerPositionInstance();
        this.soucoupeInstance = new Soucoupe();
        // this.utils.$("#background").style.width = this.canvas.canvasWidth + "px";
        // this.utils.$("#background").style.height = this.canvas.canvasHeight + "px";
    }

    init(nbOfInstances) {
        this.managerBlocInstance.blocsGeneration(nbOfInstances);
    }

    renderLoop(loopTime = 100) {
        const draw = () => {
            this.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
            this.managerBlocInstance.updateBlocs();
            this.soucoupeInstance.update();

            // console.log(this.allBlocs);

            if (!this.timer) {
                this.timer = setTimeout(draw, loopTime);
            } else setTimeout(draw, loopTime);
        };
        draw();
    }
}

export default Game;
