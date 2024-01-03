import Canvas from "../JS/class/ManagerCanvas/Canvas.js";
import Game from "./class/ManagerGame/Game.js";
import UTILS from "./class/UTILS/Utils.js";

const gameInstance = new Game();
const utilsInstance = UTILS;
utilsInstance.addEvListener("#addEnnemis", "click", () => gameInstance.inserBloc(3));
gameInstance.renderLoop(60);

// setTimeout(() => gameInstance.stopLoop(), 200);

const audio = document.querySelector("#audio1");
audio.volume = 0.1;
