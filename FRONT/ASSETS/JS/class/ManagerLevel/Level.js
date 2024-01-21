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
        this.utils.startTimerGame(3);
        this.arrLevelsFunc = [
            (gameInstance, index) => {
                gameInstance.initBlocs(this.levelChoice(index).ennemis.nb);
                gameInstance.renderLoop(this.levelChoice(index).ennemis.type);
            },
            (gameInstance, index) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
            },
            (gameInstance, index) => {
                gameInstance.initBlocs(this.levelChoice(index).ennemis.nb);
                gameInstance.renderLoop(this.levelChoice(index).ennemis.type);
            },
            (gameInstance, index) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
            },
            (gameInstance, index) => {
                gameInstance.initEnnemis(this.levelChoice(index).ennemis.nb);
                gameInstance.renderLoop(this.levelChoice(index).ennemis.type);
            },
            (gameInstance, index) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
            },
            (gameInstance, index) => {
                gameInstance.initEnnemis(this.levelChoice(index).ennemis.nb);
                gameInstance.renderLoop(this.levelChoice(index).ennemis.type);
            },
            (gameInstance, index) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
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
