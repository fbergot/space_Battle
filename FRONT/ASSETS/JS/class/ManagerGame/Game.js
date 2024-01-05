import Canvas from "../ManagerCanvas/Canvas.js";
import utilsInstance from "../UTILS/Utils.js";
import Soucoupe from "../ManagerSoucoupe/Soucoupe.js";
import ManagerBloc from "../ManagerEnnemi/ManagerBlocs.js";
import Ennemi from "../ManagerEnnemi/Ennemi.js";
import Speed from "../ManagerSpeed/Speed.js";

class Game {
    /**
     * @constructor
     */
    constructor() {
        this.canvas = Canvas;
        this.ctx = Canvas.ctx;
        this.idTimer = null;
        this.utils = utilsInstance;
        this.managerBlocInstance = new ManagerBloc();
        this.soucoupeInstance = new Soucoupe();
        this.utils.$("#background").style.width = this.canvas.canvasWidth + "px";
        this.utils.$("#background").style.height = this.canvas.canvasHeight + "px";
        this.ennemisInstances = [];
    }

    /**
     * @param {number} nbOfInstances
     */
    init(nbOfInstances) {
        this.managerBlocInstance.blocsGeneration(nbOfInstances);
    }

    /**
     * @param {number} nbOfInstances
     */
    initEnnemis(nbOfInstances) {
        for (let i = 1; i <= nbOfInstances; i++) {
            const ennemi = new Ennemi(new Speed());
            this.ennemisInstances.push(ennemi);
        }
    }

    /**
     * Coupe la boucle de jeu
     */
    stopRenderLoop() {
        window.cancelAnimationFrame(this.idTimer);
    }

    /**
     * Boucle recursive du jeu
     * @param {{ bloc: boolean, ennemi: boolean }} param0
     */
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
