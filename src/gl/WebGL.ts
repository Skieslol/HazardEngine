namespace HZD {
    export let gl: WebGLRenderingContext;

    /**
     * Webgl Initializing Class.
     */
    export class WebGL {
        /**
         * Initialize Webgl.
         * @param element 
         */
        public static initialize(element?: string): void {
            let canvas: HTMLCanvasElement;

            if (element !== undefined) {
                canvas = document.getElementById(element) as HTMLCanvasElement;

                if (canvas === undefined) throw new Error("Cannot find a Canvas elementId named: " + element);
            } else {
                canvas = document.createElement("canvas") as HTMLCanvasElement;
                document.body.appendChild(canvas);
            }

            gl = canvas.getContext("webgl2") as WebGLRenderingContext;
            if (gl === undefined) throw new Error("Unable to initialize Webgl.");
        }
    }
}