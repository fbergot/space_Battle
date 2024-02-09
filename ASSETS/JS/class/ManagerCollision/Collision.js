import utilsInstance from "../UTILS/Utils.js";

export class CollisionWeapons {
    #weaponsInstCoordAndWidthHeight;
    #ennemiInstCoordAndWidthHeight;

    constructor() {
        this.utils = utilsInstance;
        this.#weaponsInstCoordAndWidthHeight = [];
        this.#ennemiInstCoordAndWidthHeight = [];
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
                        })
                    );
                }
            });
        });
    }
}

// export class Collision {
//     constructor(gameInstance) {
//         this.gameInstance = gameInstance;
//         this.instancesCoordinatesAndWidthHeight;
//     }

//     /**
//      * Analyse si collision
//      * @param { { x: number, y: number, xMax: number, yMax: number } } coordsPlayerWidthAndHeight
//      * @param {'bloc' | 'ennemi'} typeEnnemi
//      */
//     checkIfCollision(coordsPlayerWidthAndHeight, typeEnnemi) {
//         this.instancesCoordinatesAndWidthHeight = this.gameInstance.allInstances[typeEnnemi].map(
//             (ennemiInstance) => {
//                 return ennemiInstance.coordinatesWithWidthAndHeight;
//             }
//         );
//         this.calculateCollision(coordsPlayerWidthAndHeight, this.instancesCoordinatesAndWidthHeight);
//     }

//     /**
//      * Calcule si collision effective
//      * @param { { x: number, y: number, xMax: number, yMax: number } } coordsPlayerWidthAndHeight
//      * @param { { xEnn: number, yEnn: number, xEnnMax: number, yEnnMax: number }[] } arrEnnemisTotalCoordinates
//      */
//     calculateCollision({ x, y, xMax, yMax }, arrEnnemisTotalCoordinates) {
//         arrEnnemisTotalCoordinates.forEach(({ xEnn, yEnn, xEnnMax, yEnnMax }, index) => {
//             if (
//                 ((xMax >= xEnn && xMax <= xEnnMax) || (x <= xEnnMax && x >= xEnn)) &&
//                 ((y >= yEnn && y <= yEnnMax) || (yMax >= yEnn && yMax <= yEnnMax))
//             ) {
//                 document.dispatchEvent(
//                     new CustomEvent("collision", {
//                         detail: {
//                             ennemiIndex: index,
//                         },
//                     })
//                 );
//             }
//         });
//     }
// }
