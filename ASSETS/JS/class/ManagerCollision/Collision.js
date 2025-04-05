import utilsInstance from "../UTILS/Utils.js";

export class CollisionWeapons {
    #weaponsInstCoordAndWidthHeight;
    #ennemiInstCoordAndWidthHeight;
    #playerCoordinates;

    constructor() {
        this.utils = utilsInstance;
        this.#weaponsInstCoordAndWidthHeight = [];
        this.#ennemiInstCoordAndWidthHeight = [];
        this.#playerCoordinates = null;
    }

    /**
     * Prépare les data pour analyse des collisions
     * @param { { x: number, y: number, xMax: number, yMax: number } } coordsPlayerWidthAndHeight
     * @param {'bloc' | 'ennemi'} typeEnnemi
     */
    checkIfCollision(weaponsInstance, ennemiInstances, typeOfEnnemi) {
        this.#weaponsInstCoordAndWidthHeight = weaponsInstance.map((weaponInstance) => {
            return { ...weaponInstance.coordinatesWithWidthAndHeight, damage: weaponInstance.currentDamage };
        });

        this.#ennemiInstCoordAndWidthHeight = ennemiInstances.map((ennemiInstance) => {
            return { ...ennemiInstance.coordinatesWithWidthAndHeight, life: ennemiInstance.life, typeOfEnnemi };
        });

        this.calculateCollision(this.#weaponsInstCoordAndWidthHeight, this.#ennemiInstCoordAndWidthHeight);
    }

    /**
     * Vérifie les collisions entre le joueur et les ennemis
     * @param { { x: number, y: number, xMax: number, yMax: number } } playerCoordinates - Coordonnées du joueur
     * @param {Array} ennemiInstances - Instances des ennemis
     * @param {'bloc' | 'ennemi'} typeOfEnnemi - Type d'ennemi
     */
    checkPlayerCollision(playerCoordinates, ennemiInstances, typeOfEnnemi) {
        this.#playerCoordinates = playerCoordinates;

        this.#ennemiInstCoordAndWidthHeight = ennemiInstances.map((ennemiInstance) => {
            return { ...ennemiInstance.coordinatesWithWidthAndHeight, life: ennemiInstance.life, typeOfEnnemi };
        });

        this.calculatePlayerCollision(this.#playerCoordinates, this.#ennemiInstCoordAndWidthHeight);
    }

    /**
     * Calcule si collision effective entre rocket et ennemis
     * @param { { x: number, y: number, xMax: number, yMax: number }[] } weaponsInstancesAndCoord
     * @param { { xEnn: number, yEnn: number, xEnnMax: number, yEnnMax: number }[] } ennemiInstancesAndcoord
     */
    calculateCollision(weaponsInstancesAndCoord, ennemiInstancesAndcoord) {
        ennemiInstancesAndcoord.forEach(({ xEnn, yEnn, xEnnMax, yEnnMax, life, typeOfEnnemi }, indexEnnemi) => {
            weaponsInstancesAndCoord.forEach(({ x, y, xMax, yMax, damage }, indexWeapon) => {
                if (
                    ((xMax >= xEnn && xMax <= xEnnMax) || (x <= xEnnMax && x >= xEnn)) &&
                    ((y >= yEnn && y <= yEnnMax) || (yMax >= yEnn && yMax <= yEnnMax))
                ) {
                    console.log({
                        ennemiIndex: indexEnnemi,
                        ennemiLife: life,
                        rocketIndex: indexWeapon,
                        rocketDamage: damage,
                        typeOfEnnemi,
                    });

                    this.utils.$("html").dispatchEvent(
                        new CustomEvent("collision", {
                            detail: {
                                ennemiIndex: indexEnnemi,
                                ennemiLife: life,
                                rocketIndex: indexWeapon,
                                rocketDamage: damage,
                                typeOfEnnemi,
                            },
                        }),
                    );
                }
            });
        });
    }

    /**
     * Calcule si collision effective entre le joueur et les ennemis
     * @param { { x: number, y: number, xMax: number, yMax: number } } playerCoordinates
     * @param { { xEnn: number, yEnn: number, xEnnMax: number, yEnnMax: number }[] } ennemiInstancesAndcoord
     */
    calculatePlayerCollision({ x, y, xMax, yMax }, ennemiInstancesAndcoord) {
        ennemiInstancesAndcoord.forEach(
            ({ xEnn, yEnn, xEnnMax, yEnnMax, life, typeOfEnnemi, damage: ennemiDamage }, indexEnnemi) => {
                if (
                    ((xMax >= xEnn && xMax <= xEnnMax) || (x <= xEnnMax && x >= xEnn)) &&
                    ((y >= yEnn && y <= yEnnMax) || (yMax >= yEnn && yMax <= yEnnMax))
                ) {
                    this.utils.$("html").dispatchEvent(
                        new CustomEvent("playerCollision", {
                            detail: {
                                ennemiIndex: indexEnnemi,
                                ennemiLife: life,
                                typeOfEnnemi,
                                damage: 1, // Dommage de base que le joueur subit, à ajuster selon les besoins
                            },
                        }),
                    );
                }
            },
        );
    }
}
