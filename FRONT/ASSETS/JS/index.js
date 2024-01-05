import Game from "./class/ManagerGame/Game.js";
import Canvas from "./class/ManagerCanvas/Canvas.js";
import UTILS from "./class/UTILS/Utils.js";
import ManagerLevel from "./class/ManagerLevel/ManagerLevel.js";

const gameInstance = new Game();
const canvasInstance = Canvas;
const managerLevelInstance = new ManagerLevel(gameInstance);
const utilsInstance = UTILS;

function* levelMove(i) {
    yield managerLevelInstance.loadLevel(0);
    yield managerLevelInstance.loadLevel(1);
    yield managerLevelInstance.loadLevel(2);
    yield managerLevelInstance.loadLevel(3);
}

export const iterator = levelMove(0);

utilsInstance.addEvListener("#addEnnemis", "click", () => {
    iterator.next();
});

const audio = document.querySelector("#audio1");
audio.volume = 0.1;
