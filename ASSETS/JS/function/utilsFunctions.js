import { levelsData } from "../config/levelsData.js";

export const levelChoice = (i) => levelsData.find((_, index) => i === index);
