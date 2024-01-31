import Canvas from "../ManagerCanvas/Canvas.js";
import Game from "../ManagerGame/Game.js";
import utilsInstance from "../UTILS/Utils.js";
import { levelChoice } from "../../function/utilsFunctions.js";

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
            },
            (gameInstance, index) => {
                window.clearInterval(this.utils.idSetInterval);
                gameInstance.initInstances(this.levelChoice(index).ennemis.nb, "bloc");
                gameInstance.renderLoop(this.levelChoice(index).ennemis.type);
            },
            (gameInstance, index) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
            },
            (gameInstance, index) => {
                window.clearInterval(this.utils.idSetInterval);
                gameInstance.initInstances(this.levelChoice(index).ennemis.nb, "ennemi");
                gameInstance.renderLoop(this.levelChoice(index).ennemis.type);
            },
            (gameInstance, index) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
            },
            (gameInstance, index) => {
                window.clearInterval(this.utils.idSetInterval);
                gameInstance.initInstances(this.levelChoice(index).ennemis.nb, "ennemi");
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
        const wording = (nb, word) => `${nb} ${this.utils.plural(word, nb)}`;
        this.utils.$("#time").innerText = wording(this.currentTimeEndLevel, "seconde");

        this.idSetInterval = window.setInterval(() => {
            this.currentTimeEndLevel -= 1;
            this.utils.$("#time").innerText = wording(this.currentTimeEndLevel, "seconde");
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
        if (level % 2 !== 0) {
            this.utils.startTimerGame(this.levelChoice(level).levelTime / 1000, 1000, true);
        }
        this.currentTimeLevel = this.levelChoice(level).levelTime;
        this.timer(this.currentTimeLevel);
    }
}

export default ManagerLevel;
