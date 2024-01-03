import Game from "./class/ManagerGame/Game.js";
import UTILS from "./class/UTILS/Utils.js";

const gameInstance = new Game();
const utilsInstance = UTILS;
utilsInstance.addEvListener("#addEnnemis", "click", () => gameInstance.init(3));
gameInstance.renderLoop(80);

// setTimeout(() => gameInstance.stopLoop(), 200);

const audio = document.querySelector("#audio1");
audio.volume = 0.1;
