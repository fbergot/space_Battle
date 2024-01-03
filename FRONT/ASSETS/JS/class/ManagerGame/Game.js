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
        this.managerBloc = ManagerBloc;
        this.managerPositionInstance = ManagerPositionInstance;
        this.soucoupeInstance = new Soucoupe();
        // this.utils.$("#background").style.width = this.canvas.canvasWidth + "px";
        // this.utils.$("#background").style.height = this.canvas.canvasHeight + "px";
        this.allBlocs = [];
    }

    inserBloc(nbOfInstances) {
        for (let i = 1; i <= nbOfInstances; i++) {
            const blocInstance = new this.managerBloc({
                color: "red",
                width: this.utils.randomMinMax(50, 200),
                heigth: this.utils.randomMinMax(50, 250),
            });
            this.allBlocs.push(blocInstance);
        }
    }

    renderLoop(loopTime = 100) {
        const draw = () => {
            this.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);

            this.soucoupeInstance.update();

            // console.log(this.allBlocs);

            for (const blocInstance of this.allBlocs) {
                // console.count("1");
                blocInstance.update(this.soucoupeInstance.coordinates);
            }

            if (!this.timer) {
                this.timer = setTimeout(draw, loopTime);
            } else setTimeout(draw, loopTime);
        };
        draw();
    }
}

export default Game;
