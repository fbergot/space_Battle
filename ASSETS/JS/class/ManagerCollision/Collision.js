class Collision {
    constructor(gameInstance) {
        this.gameInstance = gameInstance;
        this.instancesCoordinatesAndWidthHeight;
    }

    /**
     * Analyse si collision
     * @param { { x: number, y: number, xMax: number, yMax: number } } coordsPlayerWidthAndHeight
     * @param {'bloc' | 'ennemi'} typeEnnemi
     */
    checkIfCollision(coordsPlayerWidthAndHeight, typeEnnemi) {
        this.instancesCoordinatesAndWidthHeight = this.gameInstance.allInstances[typeEnnemi].map(
            (ennemiInstance) => {
                return ennemiInstance.coordinatesWithWidthAndHeight;
            }
        );
        this.calculateCollision(coordsPlayerWidthAndHeight, this.instancesCoordinatesAndWidthHeight);
    }

    /**
     * Calcule si collision effective
     * @param { { x: number, y: number, xMax: number, yMax: number } } coordsPlayerWidthAndHeight
     * @param { { xEnn: number, yEnn: number, xEnnMax: number, yEnnMax: number }[] } arrEnnemisTotalCoordinates
     */
    calculateCollision({ x, y, xMax, yMax }, arrEnnemisTotalCoordinates) {
        arrEnnemisTotalCoordinates.forEach(({ xEnn, yEnn, xEnnMax, yEnnMax }, index) => {
            if (
                ((xMax >= xEnn && xMax <= xEnnMax) || (x <= xEnnMax && x >= xEnn)) &&
                ((y >= yEnn && y <= yEnnMax) || (yMax >= yEnn && yMax <= yEnnMax))
            ) {
                document.dispatchEvent(
                    new CustomEvent("collision", {
                        detail: {
                            ennemiIndex: index,
                        },
                    })
                );
            }
        });
    }
}

export default Collision;
