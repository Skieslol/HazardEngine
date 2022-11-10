namespace HZD {
    /**
     * Main Engine Class.
     */
    export class Engine {
        private _canvas: HTMLCanvasElement;
        private _shader: Shader;

        /**
         * Creates a new engine.
         */
        public constructor() { }

        /**
         * Resizes to fit the window
         */
        public resize(): void {
            if (this._canvas !== undefined) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerWidth;
            }
        }

        /**
         * Start the engine.
         */
        public start(): void {

            WebGL.initialize();

            gl.clearColor(0, 0, 0, 1);

            this.loadShaders();
            this._shader.use();

            this.loop();
        }

        /**
         * Main Game Loop.
         */
        private loop(): void {
            gl.clear(gl.COLOR_BUFFER_BIT);

            requestAnimationFrame(this.loop.bind(this));
        }

        private loadShaders(): void {
            let vertexShaderSource = `
                attribute vec3 a_position;

                void main() {
                    gl_Position = vec4(a_position, 1.0);
                }
            `;
            let fragmentShaderSource = `
                precision mediump float;

                void main() {
                    gl_FragColor = vec4(1.0);
                }
            `;

            this._shader = new Shader("basic", vertexShaderSource, fragmentShaderSource);
        }
    }
}