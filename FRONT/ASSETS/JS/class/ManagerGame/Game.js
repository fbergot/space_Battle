import Canvas from "../ManagerCanvas/Canvas.js";
import utilsInstance from "../UTILS/Utils.js";
import Soucoupe from "../Soucoupe/Soucoupe.js";
import ManagerPositionInstance from "../ManagerPosition/ManagerPosition.js";
import ManagerBloc from "../Ennemis/ManagerBlocs.js";
import Ennemi from "../Ennemis/Ennemi.js";

class Game {
    constructor() {
        this.canvas = Canvas;
        this.ctx = Canvas.ctx;
        this.idTimer = null;
        this.utils = utilsInstance;
        this.managerBlocInstance = new ManagerBloc();
        this.managerPositionInstance = new ManagerPositionInstance();
        this.soucoupeInstance = new Soucoupe();
        // this.utils.$("#background").style.width = this.canvas.canvasWidth + "px";
        // this.utils.$("#background").style.height = this.canvas.canvasHeight + "px";
        this.ennemisInstances = [];
    }

    init(nbOfInstances) {
        this.managerBlocInstance.blocsGeneration(nbOfInstances);
    }

    initEnnemis(nbOfInstances) {
        for (let i = 1; i <= nbOfInstances; i++) {
            const ennemi = new Ennemi();
            this.ennemisInstances.push(ennemi);
        }
    }

    stopRenderLoop() {
        cancelAnimationFrame(this.idTimer);
    }

    renderLoop({ bloc, ennemi }) {
        this.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
        if (bloc) this.managerBlocInstance.updateBlocs();
        if (ennemi)
            this.ennemisInstances.forEach((instanceEnnemi) =>
                instanceEnnemi.update(this.soucoupeInstance.coordinates)
            );

        this.soucoupeInstance.update();

        this.idTimer = window.requestAnimationFrame(() => this.renderLoop.call(this, { bloc, ennemi }));
    }
}

export default Game;
