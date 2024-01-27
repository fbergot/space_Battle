import Canvas from "../ManagerCanvas/Canvas.js";
import utilsInstance from "../UTILS/Utils.js";
import Player from "../ManagerPlayer/Player.js";
import ManagerBloc from "../ManagerBloc/ManagerBlocs.js";
import Collision from "../ManagerCollision/Collision.js";
import ManagerEnnemis from "../ManagerEnnemi/ManagerEnnemis.js";
import GameParameters from "./GameParameters.js";
import Bloc from "../ManagerBloc/Bloc.js";

class Game {
    constructor() {
        this.managerBlocInstance = new ManagerBloc();
        this.managerEnnemisInstance = new ManagerEnnemis();
        this.gameParameters = new GameParameters(0, {
            managerBlocInstance: this.managerBlocInstance,
            managerEnnemisInstance: this.managerEnnemisInstance,
        });
        this.canvas = Canvas;
        this.ctx = Canvas.ctx;
        this.idTimer = null;
        this.counterGame = null;
        this.utils = utilsInstance;
        this.managerCollisionInstance = null;
        this.playerInstance = new Player();
        this.utils.$("#background").style.width = `${this.canvas.canvasWidth}px`;
        this.utils.$("#background").style.height = `${this.canvas.canvasHeight}px`;
        this.utils.setCSSVar("--widthCanvas", `${this.canvas.canvasWidth}px`);
    }

    /**
     * Load les instances avec Collision
     * @param {number} nbOfInstances
     * @param {'bloc' | 'ennemi'} typeofInstance
     */
    initInstances(nbOfInstances, typeofInstance) {
        if (typeofInstance === "bloc") {
            this.managerBlocInstance.generation(nbOfInstances);
            this.managerCollisionInstance = new Collision(this);
        }
        if (typeofInstance === "ennemi") {
            this.managerEnnemisInstance.generation(nbOfInstances);
            this.managerCollisionInstance = new Collision(this);
        }
    }

    /**
     * @returns { { instancesBloc: Bloc, instancesEnnemi: Ennemi instanceOf Ennemi }}
     */
    get allInstances() {
        return {
            instancesBloc: this.managerBlocInstance.instances,
            instancesEnnemi: this.managerEnnemisInstance.instances,
        };
    }

    /**
     * Stop la boucle récursive du jeu et réinit les data du jeu (ennemis & blocs)
     */
    stopRenderLoop() {
        window.cancelAnimationFrame(this.idTimer);
        this.managerBlocInstance.instancesReInit();
        this.managerEnnemisInstance.instancesReInit();
    }

    /**
     * Boucle recursive du jeu
     * @param {{ bloc: boolean, ennemi: boolean }} param0
     */
    renderLoop(typeEnnemis) {
        this.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
        this.playerInstance.update();

        if (typeEnnemis === "bloc") {
            this.managerBlocInstance.update();
            this.managerCollisionInstance.checkIfCollision(
                this.playerInstance.newCoordinatesPlayer,
                "instancesBloc"
            );
        }

        if (typeEnnemis === "soucoupe") {
            this.managerEnnemisInstance.update(this.playerInstance.coordinates);
            this.managerCollisionInstance.checkIfCollision(
                this.playerInstance.newCoordinatesPlayer,
                "instancesEnnemi"
            );
        }

        this.idTimer = window.requestAnimationFrame(() => this.renderLoop.call(this, typeEnnemis));
    }
}

export default Game;
