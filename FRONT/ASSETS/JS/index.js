import Game from "./class/ManagerGame/Game.js";
import Canvas from "./class/ManagerCanvas/Canvas.js";
import UTILS from "./class/UTILS/Utils.js";
import ManagerLevel from "./class/ManagerLevel/ManagerLevel.js";

const gameInstance = new Game();
const canvasInstance = Canvas;
const managerLevelInstance = new ManagerLevel(gameInstance);
const utilsInstance = UTILS;

/**
 * Fonction génératrice (gère les levels du jeu)
 * @param {number} i
 */
function* levelMove(i) {
    yield managerLevelInstance.loadLevel(i);
    yield managerLevelInstance.loadLevel(++i);
    yield managerLevelInstance.loadLevel(++i);
    yield managerLevelInstance.loadLevel(++i);
    yield managerLevelInstance.loadLevel(++i);
    yield managerLevelInstance.loadLevel(++i);
}

export const generator = levelMove(0);

utilsInstance.addEvListener("#addEnnemis", "click", () => {
    generator.next();
});

const audio = document.querySelector("#audio1");
audio.volume = 0.1;
