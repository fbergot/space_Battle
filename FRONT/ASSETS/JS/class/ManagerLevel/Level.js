import Canvas from "../ManagerCanvas/Canvas.js";
import Game from "../ManagerGame/Game.js";

class ManagerLevel {
    /**
     * @constructor
     * @param {Game} gameInstance
     */
    constructor(gameInstance) {
        this.canvas = Canvas;
        this.ctx = this.canvas.ctx;
        this.gameInstance = gameInstance;
        this.arrLevelsFunc = [
            (gameInstance) => {
                gameInstance.init(4);
                gameInstance.renderLoop({ bloc: true, ennemi: false });
            },
            (gameInstance) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
            },
            (gameInstance) => {
                gameInstance.init(8);
                gameInstance.renderLoop({ bloc: true, ennemi: false });
            },
            (gameInstance) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
            },
            (gameInstance) => {
                gameInstance.initEnnemis(5);
                gameInstance.renderLoop({ bloc: false, ennemi: true });
            },
            (gameInstance) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
            },
        ];
    }

    /**
     * Charge un level dans le pile des niveaux
     * @param {number} level
     */
    loadLevel(level) {
        this.arrLevelsFunc[level](this.gameInstance);
    }
}

export default ManagerLevel;
