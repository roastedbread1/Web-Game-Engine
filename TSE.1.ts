namespace TSE {
    /**
     * WebGL rendering context
     */
    export var gl: WebGLRenderingContext;

    /**
     * setting up the WebGl rendering context
     */
    export class GLUtilities {
        /**
         * initializes the WebGL rendering context
         * @param elementID the id of the canvas element to get the rendering context from (optional)
         * @returns the WebGL rendering context
         */
        public static initialize(elementID?: string): HTMLCanvasElement {

            let canvas: HTMLCanvasElement;

            if (elementID !== undefined) {
                canvas = document.getElementById(elementID) as HTMLCanvasElement;
                if (canvas === undefined) {
                    throw new Error("Cannot find a canvas element named: " + elementID);
                }
            } else {
                canvas = document.createElement("canvas") as HTMLCanvasElement;
                document.body.appendChild(canvas);
            }

            gl = canvas.getContext("webgl");
            if (gl === undefined || gl === null) {
                throw new Error("Unable to initialize WebGL!");
            }
            return canvas;
        }
    }
}
