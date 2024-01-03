import utilsInstance from "../../class/UTILS/Utils.js";

class Canvas {
    #ctx;
    #canvas;

    constructor(pxTrigger = 800) {
        this.utils = utilsInstance;
        this.contentCanvas = this.utils.$(".content-canvas");
        this.#canvas = document.createElement("canvas");
        this.#canvas.setAttribute("id", "canvas");
        this.#ctx = this.#canvas.getContext("2d");
        this.ratioWidth = window.innerWidth > pxTrigger ? 0.7 : 0.9;
        this.ratioHeight = window.innerHeight > pxTrigger ? 0.7 : 0.8;
        this.canvasWidth = window.innerWidth * this.ratioWidth;
        this.canvasHeight = window.innerHeight * this.ratioHeight;
        this.canvasBox = window.innerWidth > pxTrigger ? 3 : 2;
        this.#canvas.width = Math.floor(this.canvasWidth / this.canvasBox) * this.canvasBox;
        this.#canvas.height = Math.floor(this.canvasHeight / this.canvasBox) * this.canvasBox;
        this.contentCanvas.appendChild(this.#canvas);
    }

    get ctx() {
        return this.#ctx;
    }
}

export default new Canvas();
