import Game from "./class/ManagerGame/Game.js";
import UTILS from "./class/UTILS/Utils.js";
import ManagerLevel from "./class/ManagerLevel/Level.js";
import { levelChoice } from "./config/levelsData.js";

export const gameInstance = new Game();
const utilsInstance = UTILS;

/**
 * Fonction génératrice (gère les levels du jeu)
 * @generator
 * @param {number} i
 */
function* levelMove(i) {
    yield managerLevelInstance.loadLevel(i);
    yield managerLevelInstance.loadLevel(++i);
    yield managerLevelInstance.loadLevel(++i);
    yield managerLevelInstance.loadLevel(++i);
    yield managerLevelInstance.loadLevel(++i);
    yield managerLevelInstance.loadLevel(++i);
    yield managerLevelInstance.loadLevel(++i);
    yield managerLevelInstance.loadLevel(++i);
}

const generator = levelMove(0);
const managerLevelInstance = new ManagerLevel(gameInstance, generator);

document.addEventListener("gamestart", () => {
    generator.next();
});

const audio = document.querySelector("#audio1");
audio.volume = 0.1;
