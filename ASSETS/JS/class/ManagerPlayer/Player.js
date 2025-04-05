import Canvas from "../ManagerCanvas/Canvas.js";
import { ManagerPosition, ManagerPositionWeapons } from "../ManagerPosition/Position.js";
import utilsInstance from "../UTILS/Utils.js";
import Speed from "../ManagerSpeed/Speed.js";
import ManagerRocket from "../ManagerRocket/ManagerRocket.js";

class Soucoupe {
    /** @private {number} #x */
    #x;
    /** @private {number} #y */
    #y;
    /** @private {string} #direction */
    #direction;
    /** @private {string} #life */
    #life;

    constructor() {
        this.speedInstance = new Speed();
        this.speedInstance.valueLevel = 4;
        this.PositionInstance = new ManagerPosition(this, this.speedInstance);
        this.managerRocketInstance = new ManagerRocket(this);
        this.utils = utilsInstance;
        this.image = this.utils.makeImage("player", `player_UP`);
        this.canvas = Canvas;
        this.ctx = this.canvas.ctx;
        this.widthAndHeightDic = [70, 100];
        this.#direction;
        this.width = this.widthAndHeightDic[0];
        this.height = this.widthAndHeightDic[1];
        this.#x = this.utils.randomMinMax(1, this.canvas.canvasWidth - 26.6);
        this.#y = this.canvas.canvasHeight - this.widthAndHeightDic[1] - 10;
        this.#life;
        this.isShowingDamage = false;
        this.damageEffectStartTime = 0;
        this.damageEffectDuration = 500;
    }

    /**
     * @returns {number}
     */
    get currentLife() {
        return this.#life;
    }

    /**
     * @param {number}
     */
    set currentLife(value) {
        if (value < this.#life) {
            this.isShowingDamage = true;
            this.damageEffectStartTime = Date.now();
        }
        this.#life = value;
    }

    /**
     * Retourne les nouvelles coordonnées player pour gérer les collisions
     * @returns {{ x: number, y: number, xMax: number, yMax: number }}
     */
    get newCoordinatesPlayer() {
        return {
            x: this.#x,
            y: this.#y,
            xMax: this.#x + this.width,
            yMax: this.#y + this.height,
        };
    }

    /**
     * @returns {[x: number, y: number]}
     */
    get widthAndHeight() {
        return [this.width, this.height];
    }

    /**
     * @returns {string}
     */
    get direction() {
        return this.#direction;
    }
    /**
     * @returns {string}
     */
    set direction(value) {
        this.#direction = value;
    }

    /**
     * @returns {[x: number, y: number]}
     */
    get coordinates() {
        return [this.#x, this.#y];
    }

    /**
     * @param {[x: number, y: number]}
     */
    set coordinates(coordinatesXY) {
        [this.#x, this.#y] = coordinatesXY;
    }

    /**
     * Update showDamageEffect and draw on canvas player
     */
    showDamageEffect() {
        // Paramètres pour les particules d'explosion
        const numParticles = 10;
        const colors = ["#ff0000", "#ff5500", "#ffaa00", "#ffff00", "#ffffff"];
        const maxRadius = 8;
        const maxSpeed = 3;
        const duration = 300; // durée de l'effet en millisecondes

        // Générer les particules d'explosion autour du joueur
        for (let i = 0; i < numParticles; i++) {
            // Position aléatoire autour du centre du joueur
            const centerX = this.#x + this.width / 2;
            const centerY = this.#y + this.height;

            // Taille et couleur aléatoires pour chaque particule
            const radius = Math.random() * maxRadius + 1;
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Direction aléatoire
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50 + 10;

            // Position de la particule
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;

            // Dessiner la particule
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fillStyle = color;
            this.ctx.fill();
        }
    }

    /**
     * Update position and draw on canvas player
     */
    update() {
        this.PositionInstance.updateCoordinates();
        this.managerRocketInstance.update();

        // Vérifier si nous devons afficher l'effet de dommage
        if (this.isShowingDamage) {
            const currentTime = Date.now();
            if (currentTime - this.damageEffectStartTime < this.damageEffectDuration) {
                this.draw();
                this.showDamageEffect();
            } else {
                this.isShowingDamage = false;
                this.draw();
            }
        } else {
            this.draw();
        }
    }

    /**
     * Draws the player's image on the canvas at the current coordinates.
     */
    draw() {
        this.ctx.drawImage(this.image, this.#x, this.#y, this.width, this.height);
    }
}

export default Soucoupe;
