import Game from "./class/ManagerGame/Game.js";
import UTILS from "./class/UTILS/Utils.js";
import ManagerLevel from "./class/ManagerLevel/Level.js";
import { levelsData } from "./config/levelsData.js";

export const gameInstance = new Game();
const utils = UTILS;

/**
 * Fonction génératrice (gère les levels du jeu)
 * @generator
 * @param {number} i
 * @param {number} levelsTot
 */
function* levelMove(i, levelsTot) {
    while (i < levelsTot) {
        yield managerLevelInstance.loadLevel(i++);
    }
}

const levelsTot = levelsData.length;
const initialLevel = 0;
const generator = levelMove(initialLevel, levelsTot);
const managerLevelInstance = new ManagerLevel(gameInstance, generator);

utils.addEvListener("html", "gamestart", () => {
    generator.next();
});

const audio = utils.$("#audio1");
audio.volume = 1;
