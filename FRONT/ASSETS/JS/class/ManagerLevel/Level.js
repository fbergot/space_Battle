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
        this.arrLevelsFunc = [
            (gameInstance, index) => {
                gameInstance.initBlocs(this.levelChoice(index).ennemis.nb);
                gameInstance.renderLoop({ bloc: true, ennemi: false });
                this.currentTimeLevel = this.levelChoice(index).levelTime;
            },
            (gameInstance, index) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
                this.currentTimeLevel = this.levelChoice(index).levelTime;
            },
            (gameInstance, index) => {
                gameInstance.initBlocs(this.levelChoice(index).ennemis.nb);
                gameInstance.renderLoop({ bloc: true, ennemi: false });
                this.currentTimeLevel = this.levelChoice(index).levelTime;
            },
            (gameInstance, index) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
                this.currentTimeLevel = this.levelChoice(index).levelTime;
            },
            (gameInstance, index) => {
                gameInstance.initEnnemis(this.levelChoice(index).ennemis.nb);
                gameInstance.renderLoop({ bloc: false, ennemi: true });
                this.currentTimeLevel = this.levelChoice(index).levelTime;
            },
            (gameInstance, index) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
                this.currentTimeLevel = this.levelChoice(index).levelTime;
            },
        ];
    }

    /**
     *
     * @param {number} time
     * @param {() => void} func
     */
    timer(time, func) {
        setTimeout(() => {
            func();
        }, time);
    }

    /**
     * Charge un level dans le pile des niveaux
     * @param {number} level
     */
    loadLevel(level) {
        this.arrLevelsFunc[level](this.gameInstance, level);
        this.timer(this.currentTimeLevel, () => this.generator.next());
    }
}

export default ManagerLevel;
