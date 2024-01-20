import Canvas from "../ManagerCanvas/Canvas.js";
import utilsInstance from "../UTILS/Utils.js";
import Soucoupe from "../ManagerSoucoupe/Soucoupe.js";
import ManagerBloc from "../ManagerBloc/ManagerBlocs.js";
import Collision from "../ManagerCollision/Collision.js";
import ManagerEnnemis from "../ManagerEnnemi/ManagerEnnemis.js";

class Game {
    constructor() {
        this.canvas = Canvas;
        this.ctx = Canvas.ctx;
        this.idTimer = null;
        this.counterGame = null;
        this.utils = utilsInstance;
        this.managerBlocInstance = new ManagerBloc();
        this.managerEnnemisInstance = new ManagerEnnemis();
        this.managerCollisionInstance = null;
        this.soucoupeInstance = new Soucoupe();
        this.utils.$("#background").style.width = `${this.canvas.canvasWidth}px`;
        this.utils.$("#background").style.height = `${this.canvas.canvasHeight}px`;
    }

    /**
     * Load les instances
     * @param {number} nbOfInstances
     */
    initBlocs(nbOfInstances) {
        this.managerBlocInstance.generation(nbOfInstances);
        this.managerCollisionInstance = new Collision(this.managerBlocInstance, this.managerEnnemisInstance);
    }

    /**
     * Load les instances
     * @param {number} nbOfInstances
     */
    initEnnemis(nbOfInstances) {
        this.managerEnnemisInstance.generation(nbOfInstances);
        this.managerCollisionInstance = new Collision(this.managerBlocInstance, this.managerEnnemisInstance);
    }

    /**
     * Stop la boucle récursive du jeu et réinit les data du jeu (ennemis & blocs)
     */
    stopRenderLoop() {
        window.cancelAnimationFrame(this.idTimer);
        this.managerBlocInstance.blocInstancesReInit();
        this.managerEnnemisInstance.ennemisInstancesReInit();
    }

    /**
     * Boucle recursive du jeu
     * @param {{ bloc: boolean, ennemi: boolean }} param0
     */
    renderLoop(typeEnnemis) {
        this.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);

        if (typeEnnemis === "blocs") {
            this.managerBlocInstance.updateBlocs();
            this.managerCollisionInstance.checkIfCollision(
                this.soucoupeInstance.newCoordinatesPlayer,
                "managerBlocInstance"
            );
        }

        if (typeEnnemis === "soucoupe") {
            this.managerEnnemisInstance.updateEnnemis(this.soucoupeInstance.coordinates);
            this.managerCollisionInstance.checkIfCollision(
                this.soucoupeInstance.newCoordinatesPlayer,
                "managerEnnemisInstance"
            );
        }

        this.soucoupeInstance.update();

        this.idTimer = window.requestAnimationFrame(() => this.renderLoop.call(this, typeEnnemis));
    }
}

export default Game;
