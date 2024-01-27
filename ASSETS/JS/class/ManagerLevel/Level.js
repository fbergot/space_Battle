import { levelChoice } from "../../config/levelsData.js";
import Canvas from "../ManagerCanvas/Canvas.js";
import Game from "../ManagerGame/Game.js";
import utilsInstance from "../UTILS/Utils.js";

class ManagerLevel {
    /**
     * @constructor
     * @param {Game} gameInstance
     */
    constructor(gameInstance, generator) {
        this.levelChoice = levelChoice;
        this.utils = utilsInstance;
        this.generator = generator;
        this.canvas = Canvas;
        this.ctx = this.canvas.ctx;
        this.gameInstance = gameInstance;
        this.currentTimeLevel;
        this.currentTimeEndLevel;
        this.utils.startTimerGame(4, 1000, false);
        this.arrLevelsFunc = [
            (gameInstance, index) => {
                window.clearInterval(this.utils.idSetInterval);
                gameInstance.initInstances(this.levelChoice(index).ennemis.nb, "bloc");
                gameInstance.renderLoop(this.levelChoice(index).ennemis.type);
            },
            (gameInstance, index) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
                this.utils.startTimerGame(this.levelChoice(index).levelTime / 1000, 1000, true);
            },
            (gameInstance, index) => {
                window.clearInterval(this.utils.idSetInterval);
                gameInstance.initInstances(this.levelChoice(index).ennemis.nb, "bloc");
                gameInstance.renderLoop(this.levelChoice(index).ennemis.type);
            },
            (gameInstance, index) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
                this.utils.startTimerGame(this.levelChoice(index).levelTime / 1000, 1000, true);
            },
            (gameInstance, index) => {
                window.clearInterval(this.utils.idSetInterval);
                gameInstance.initInstances(this.levelChoice(index).ennemis.nb, "ennemi");
                gameInstance.renderLoop(this.levelChoice(index).ennemis.type);
            },
            (gameInstance, index) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
                this.utils.startTimerGame(this.levelChoice(index).levelTime / 1000, 1000, true);
            },
            (gameInstance, index) => {
                window.clearInterval(this.utils.idSetInterval);
                gameInstance.initInstances(this.levelChoice(index).ennemis.nb, "ennemi");
                gameInstance.renderLoop(this.levelChoice(index).ennemis.type);
            },
            (gameInstance, index) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
                this.utils.startTimerGame(this.levelChoice(index).levelTime / 1000, 1000, true);
            },
        ];
    }

    /**
     *
     * @param {number} time
     * @param {() => void} func
     */
    timer(time) {
        window.setTimeout(() => {
            document.dispatchEvent(this.utils.eventStartGame);
        }, time);

        this.currentTimeEndLevel = time / 1000;
        this.utils.$("#time").innerText = this.currentTimeEndLevel;

        this.idSetInterval = window.setInterval(() => {
            this.currentTimeEndLevel -= 1;
            this.utils.$("#time").innerText = this.currentTimeEndLevel;
            if (this.currentTimeEndLevel === 1) {
                window.clearInterval(this.idSetInterval);
            }
        }, 1000);
    }

    /**
     * Charge un level dans le pile des niveaux
     * @param {number} level
     */
    loadLevel(level) {
        this.arrLevelsFunc[level](this.gameInstance, level);
        this.currentTimeLevel = this.levelChoice(level).levelTime;
        this.timer(this.currentTimeLevel);
    }
}

export default ManagerLevel;
