class Collision {
    constructor(gameInstance) {
        this.gameInstance = gameInstance;
        this.weaponsInstCoordAndWidthHeight = [];
        this.ennemiInstCoordAndWidthHeight = [];
    }

    /**
     * Analyse si collision
     * @param { { x: number, y: number, xMax: number, yMax: number } } coordsPlayerWidthAndHeight
     * @param {'bloc' | 'ennemi'} typeEnnemi
     */
    checkIfCollision(weaponsInstance, ennemiInstances) {
        this.weaponsInstCoordAndWidthHeight = weaponsInstance.map((weaponInstance) => {
            return weaponInstance.coordinatesWithWidthAndHeight;
        });
        this.ennemiInstCoordAndWidthHeight = ennemiInstances.map((ennemiInstance) => {
            return ennemiInstance.coordinatesWithWidthAndHeight;
        });

        this.calculateCollision(this.weaponsInstCoordAndWidthHeight, this.ennemiInstCoordAndWidthHeight);
    }

    /**
     * Calcule si collision effective
     * @param { { x: number, y: number, xMax: number, yMax: number } } coordsPlayerWidthAndHeight
     * @param { { xEnn: number, yEnn: number, xEnnMax: number, yEnnMax: number }[] } arrEnnemisTotalCoordinates
     */
    calculateCollision(weaponsInstancesAndCoord, ennemiInstancesAndcoord) {
        ennemiInstancesAndcoord.forEach(({ xEnn, yEnn, xEnnMax, yEnnMax }, index) => {
            weaponsInstancesAndCoord.forEach(({ x, y, xMax, yMax }, i) => {
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
        });
    }
}

export default Collision;
