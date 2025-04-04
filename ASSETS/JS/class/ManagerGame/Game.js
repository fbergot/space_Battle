import Canvas from "../ManagerCanvas/Canvas.js";
import utilsInstance from "../UTILS/Utils.js";
import Player from "../ManagerPlayer/Player.js";
import ManagerBloc from "../ManagerBloc/ManagerBlocs.js";
import { CollisionWeapons } from "../ManagerCollision/Collision.js";
import ManagerEnnemis from "../ManagerEnnemi/ManagerEnnemis.js";
import GameParameters from "./GameParameters.js";
import Bloc from "../ManagerBloc/Bloc.js";
import ManagerRocket from "../ManagerRocket/ManagerRocket.js";

class Game {
    constructor() {
        this.managerBlocInstance = new ManagerBloc();
        this.managerEnnemisInstance = new ManagerEnnemis();
        this.playerInstance = new Player();
        this.gameParameters = new GameParameters(0, {
            managerBlocInstance: this.managerBlocInstance,
            managerEnnemisInstance: this.managerEnnemisInstance,
            managerRocketInstance: this.playerInstance.managerRocketInstance,
        });
        this.canvas = Canvas;
        this.ctx = Canvas.ctx;
        this.idTimer = null;
        this.counterGame = null;
        this.utils = utilsInstance;
        this.managerCollisionInstance = null;
        this.utils.$("#background").style.width = `${this.canvas.canvasWidth}px`;
        this.utils.$("#background").style.height = `${this.canvas.canvasHeight}px`;
        this.utils.setCSSVar("--widthCanvas", `${this.canvas.canvasWidth}px`);

        // Event listener for player collision
        document.querySelector("html").addEventListener("playerCollision", (e) => {
            const { ennemiIndex, ennemiLife, typeOfEnnemi, damage } = e.detail;
            // Reduce player's life
            this.playerInstance.life -= damage;
            // Check if the player is dead
            if (this.playerInstance.life <= 0) {
                this.gameOver();
            }
            // Add visual damage effects
            this.playerInstance.showDamageEffect();
        });
    }

    /**
     * Load les instances avec Collision
     * @param {number} nbOfInstances
     * @param {'bloc' | 'ennemi'} typeofInstance
     */
    initInstances(dataCurrentLevel) {
        // on actualise les dommage des rockets selon le level
        this.playerInstance.managerRocketInstance.currentDamage = dataCurrentLevel.player.rockets.damage;

        if (dataCurrentLevel.ennemis.type === "bloc") {
            this.managerBlocInstance.generation(dataCurrentLevel);
            this.managerCollisionInstance = new CollisionWeapons();
        }
        if (["soucoupe", "fusee"].includes(dataCurrentLevel.ennemis.type)) {
            this.managerEnnemisInstance.generation(dataCurrentLevel);
            this.managerCollisionInstance = new CollisionWeapons();
        }
    }

    /**
     * @returns { { instancesBloc: Bloc, instancesEnnemi: Ennemi }}
     */
    get allInstances() {
        return {
            instancesBloc: this.managerBlocInstance.instances,
            instancesEnnemi: this.managerEnnemisInstance.instances,
            allInstancesEnnemis: [...this.managerBlocInstance.instances, ...this.managerEnnemisInstance.instances],
        };
    }

    /**
     * Stop la boucle récursive du jeu et réinit les data du jeu (ennemis & blocs)
     */
    stopRenderLoop() {
        window.cancelAnimationFrame(this.idTimer);
        this.managerBlocInstance.instancesReInit();
        this.managerEnnemisInstance.instancesReInit();
        this.playerInstance.managerRocketInstance.instancesReInit();
    }

    /**
     * Boucle recursive du jeu
     * @param { 'bloc' | 'soucoupe' } typeEnnemis
     */
    renderLoop(typeEnnemis) {
        this.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
        this.playerInstance.update();

        if (typeEnnemis === "bloc") {
            this.managerBlocInstance.update();
            this.managerCollisionInstance.checkIfCollision(
                this.playerInstance.managerRocketInstance.instances,
                this.allInstances.instancesBloc,
                typeEnnemis
            );
        }

        if (["soucoupe", "fusee"].includes(typeEnnemis)) {
            this.managerEnnemisInstance.update(this.playerInstance.coordinates);
            this.managerCollisionInstance.checkIfCollision(
                this.playerInstance.managerRocketInstance.instances,
                this.allInstances.instancesEnnemi,
                typeEnnemis
            );
            this.managerCollisionInstance.checkPlayerCollision (
                this.playerInstance.newCoordinatesPlayer,
                this.allInstances.instancesEnnemi,
                typeEnnemis
            );
        }

        this.idTimer = window.requestAnimationFrame(() => this.renderLoop.call(this, typeEnnemis));
    }

    /**
     * Handle game over logic
     */
    gameOver() {
        alert("Game Over");
        // Additional game over logic can be added here
    }
}

export default Game;
