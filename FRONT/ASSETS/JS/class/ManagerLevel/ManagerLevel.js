import Canvas from "../ManagerCanvas/Canvas.js";

class ManagerLevel {
    constructor(gameInstance) {
        this.canvas = Canvas;
        this.ctx = this.canvas.ctx;
        this.gameInstance = gameInstance;
        this.arrLevelsFunc = [
            (gameInstance) => {
                gameInstance.init(5);
                gameInstance.renderLoop({ bloc: true, ennemi: false });
            },
            (gameInstance) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
            },
            (gameInstance) => {
                gameInstance.init(10);
                gameInstance.renderLoop({ bloc: true, ennemi: false });
            },
            (gameInstance) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
            },
            (gameInstance) => {
                gameInstance.initEnnemis(10);
                gameInstance.renderLoop({ bloc: false, ennemi: true });
            },
            (gameInstance) => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
                gameInstance.stopRenderLoop();
            },
        ];
    }

    loadLevel(level) {
        this.arrLevelsFunc[level](this.gameInstance);
    }
}

export default ManagerLevel;
