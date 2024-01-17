import { levelChoice } from "../../config/levelsData.js";

class Utils {
    constructor() {
        this.$ = (selector) => document.querySelector(selector);
        this.$$ = (selector) => document.querySelectorAll(selector);
    }

    /**
     * @param {array} arr Array for take one element random
     * @return {mixed} element random in the array
     */
    getRandomElementFromArr(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    /**
     * @param {number} min min of range
     * @param {number} max max of range
     * @return {number} integer random in the range
     */
    randomMinMax(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Add event listener with a function
     * @param {string} target
     * @param {string} typeEvent
     * @param {(e) => void} callback
     */
    addEvListener(target, typeEvent, callback) {
        this.$(target).addEventListener(typeEvent, callback);
    }

    /**
     * Make IMG FROM path
     * @param {string} typeOfgroup
     * @param {string} type
     * @returns {?string}
     */
    getImagePath(typeOfgroup, type = null) {
        const dictioPaths = {
            background: `./ASSETS/IMAGES/nebul.jpg`,
            player: {
                player_DOWN: `./ASSETS/IMAGES/player_DOWN.png`,
                player_UP: `./ASSETS/IMAGES/player_UP.png`,
                player_LEFT: `./ASSETS/IMAGES/player_LEFT.png`,
                player_RIGHT: `./ASSETS/IMAGES/player_RIGHT.png`,
            },
            ennemis: {
                soucoupe: `./ASSETS/IMAGES/ennemi1-removebg.png`,
                fusee: `./ASSETS/IMAGES/ennemiFusee.png`,
                spacial: `./ASSETS/IMAGES/ennemiSpatial.png`,
                vaisseau: `./ASSETS/IMAGES/ennemiVaisseau.png`,
            },
        };

        if (type) return dictioPaths[typeOfgroup][type] || null;
        return dictioPaths[typeOfgroup] || null;
    }

    /**
     * Make IMG FROM path
     * @param {string} typeOfgroup
     * @param {?string} type
     * @returns {ImageBitmapRenderingContext}
     */
    makeImage(typeOfgroup, type) {
        const src = this.getImagePath(typeOfgroup, type);
        const image = new Image();
        image.src = src;

        return image;
    }

    /**
     * @param {number} index
     */
    makeTimerGame(index) {
        this.$("#time").innerText = levelChoice(index).levelTime;
        this.idSetInterval = window.setInterval(() => {
            this.$("#time").innerText = parseInt(this.$("#time").innerText) - 1000;
            if (parseInt(this.$("#time").innerText) - 1000 === 0) window.clearInterval(this.idSetInterval);
        }, 1000);
    }
}

export default new Utils();
