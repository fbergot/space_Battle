class Utils {
    constructor() {
        this.$ = (selector) => document.querySelector(selector);
        this.$$ = (selector) => ment.querySelectorAll(selector);
        this.eventStartGame = new CustomEvent("gamestart");
    }

    /**
     * @param {string} word
     * @param {number} nb
     * @returns {string}
     */
    plural(word, nb) {
        return nb > 1 ? `${word}s` : word;
    }

    /**
     * @param {string} varCSS
     * @param {string | number} value
     */
    setCSSVar(varCSS, value) {
        const root = this.$(":root");
        root.style.setProperty(varCSS, value);
        getComputedStyle(root);
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
        return Math.round(Math.random() * (max - min + 1) + min);
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
            rocket: {
                rocket_DOWN: `./ASSETS/IMAGES/rocket_DOWN.png`,
                rocket_UP: `./ASSETS/IMAGES/rocket_UP.png`,
                rocket_LEFT: `./ASSETS/IMAGES/rocket_LEFT.png`,
                rocket_RIGHT: `./ASSETS/IMAGES/rocket_RIGHT.png`,
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
        if (!src) throw new Error("Aucun path pour l'image.");

        const image = new Image();
        image.src = src;

        return image;
    }

    /**
     * @param {number} nbEnnemis
     */
    displayEnnemis(nbEnnemis) {
        this.$(".allEnnemis").innerHTML = "";

        let allEnnemis = "";
        for (let i = 0; i < nbEnnemis; i++) {
            allEnnemis = allEnnemis.concat(`<div class='iconEnnemi'>👽</div>`);
        }
        this.$(".allEnnemis").innerHTML = allEnnemis;
    }

    /**
     *
     * @param {number} nbInit seconde
     * @param {number} time MS
     * @param {Boolean} reinit
     */
    startTimerGame(nbInit, time = 1000, reinit = false) {
        if (reinit) {
            this.$(".startTime").style.display = "block";
            this.$(".container-counter").classList.remove("rotateCounter");
        }
        let count = nbInit;
        this.$("#startCounter").innerText = nbInit;

        this.idSetInterval = window.setInterval(() => {
            --count;
            this.$("#startCounter").innerText = count;
            if (count === 0) {
                this.$("#startCounter").innerText = "GOOOO !!!";
                this.$(".container-counter").classList.add("rotateCounter");
            }
            if (count === -1) {
                window.clearInterval(this.idSetInterval);
                if (!reinit) this.$(".startTime").style.display = "none";
                else this.$(".startTime").style.display = "block";
                this.$("html").dispatchEvent(this.eventStartGame);
            }
        }, time);
    }
}

export default new Utils();
