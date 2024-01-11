class Collision {
    constructor(managerBlocInstance, managerEnnemisInstance) {
        this.managerBlocInstance = managerBlocInstance;
        this.managerEnnemisInstance = managerEnnemisInstance;
        this.instancesCoordinatesAndWidthHeight;
    }

    checkIfCollision(coordsPlayerWidthAndHeight, manager) {
        this.instancesCoordinatesAndWidthHeight = this[manager].instances.map((ennemiInstance) => {
            return ennemiInstance.coordinatesWithWidthAndHeight;
        });
        this.calculateCollision(coordsPlayerWidthAndHeight, this.instancesCoordinatesAndWidthHeight);
    }

    calculateCollision({ x, y, xMax, yMax }, arrEnnemisTotalCoordinates) {
        arrEnnemisTotalCoordinates.forEach(({ xEnn, yEnn, xEnnMax, yEnnMax }) => {
            if (
                ((xMax >= xEnn && xMax <= xEnnMax) || (x <= xEnnMax && x >= xEnn)) &&
                ((y >= yEnn && y <= yEnnMax) || (yMax >= yEnn && yMax <= yEnnMax))
            )
                console.log({ xEnn, yEnn, xEnnMax, yEnnMax }, { x, y, xMax, yMax });
        });
    }
}

export default Collision;
