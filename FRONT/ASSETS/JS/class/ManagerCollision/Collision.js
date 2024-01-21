class Collision {
    constructor(managerBlocInstance, managerEnnemisInstance) {
        this.managerBlocInstance = managerBlocInstance;
        this.managerEnnemisInstance = managerEnnemisInstance;
        this.instancesCoordinatesAndWidthHeight;
        this.eventName = new CustomEvent("collision");
    }

    checkIfCollision(coordsPlayerWidthAndHeight, manager) {
        this.instancesCoordinatesAndWidthHeight = this[manager].instances.map((ennemiInstance) => {
            return ennemiInstance.coordinatesWithWidthAndHeight;
        });
        this.calculateCollision(coordsPlayerWidthAndHeight, this.instancesCoordinatesAndWidthHeight);
    }

    /**
     *
     * @param {{ x: number, y: number, xMax: number, yMax: number }} coordsPlayerWidthAndHeight
     * @param {{ xEnn: number, yEnn: number, xEnnMax: number, yEnnMax: number }[]} arrEnnemisTotalCoordinates
     */
    calculateCollision({ x, y, xMax, yMax }, arrEnnemisTotalCoordinates) {
        arrEnnemisTotalCoordinates.forEach(({ xEnn, yEnn, xEnnMax, yEnnMax }) => {
            if (
                ((xMax >= xEnn && xMax <= xEnnMax) || (x <= xEnnMax && x >= xEnn)) &&
                ((y >= yEnn && y <= yEnnMax) || (yMax >= yEnn && yMax <= yEnnMax))
            ) {
                document.dispatchEvent(this.eventName);
            }
        });
    }
}

export default Collision;
