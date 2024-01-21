import Canvas from "../ManagerCanvas/Canvas.js";
import utilsInstance from "../UTILS/Utils.js";
import Player from "../ManagerPlayer/Player.js";
import ManagerBloc from "../ManagerBloc/ManagerBlocs.js";
import Collision from "../ManagerCollision/Collision.js";
import ManagerEnnemis from "../ManagerEnnemi/ManagerEnnemis.js";
import GameParameters from "./GameParameters.js";

class Game {
    constructor() {
        this.gameParameters = new GameParameters(3);
        this.canvas = Canvas;
        this.ctx = Canvas.ctx;
        this.idTimer = null;
        this.counterGame = null;
        this.utils = utilsInstance;
        this.managerBlocInstance = new ManagerBloc();
        this.managerEnnemisInstance = new ManagerEnnemis();
        this.managerCollisionInstance = null;
        this.playerInstance = new Player();
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
                this.playerInstance.newCoordinatesPlayer,
                "managerBlocInstance"
            );
        }

        if (typeEnnemis === "soucoupe") {
            this.managerEnnemisInstance.updateEnnemis(this.playerInstance.coordinates);
            this.managerCollisionInstance.checkIfCollision(
                this.playerInstance.newCoordinatesPlayer,
                "managerEnnemisInstance"
            );
        }

        this.playerInstance.update();

        this.idTimer = window.requestAnimationFrame(() => this.renderLoop.call(this, typeEnnemis));
    }
}

export default Game;
