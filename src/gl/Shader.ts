namespace HZD {
    /**
     * Main Shader Class
     */
    export class Shader {
        private _name: string;
        private _program: WebGLProgram;

        /**
         * Create a new shader.
         * @param name Name of the shader.
         * @param vertexShaderSource Source of the vertex Shader.
         * @param fragmentShaderSource Source of the fragment Shader.
         */
        public constructor(
            name: string,
            vertexShaderSource: string,
            fragmentShaderSource: string) {
                this._name = name;
                let vertexShader = this.Load(vertexShaderSource, gl.VERTEX_SHADER);
                let fragmentShader = this.Load(fragmentShaderSource, gl.FRAGMENT_SHADER);

                this.createProgram(vertexShader, fragmentShader);
        }

        /**
         * Name of the shader.
         */
        public name(): string {
            return this._name;
        }

        /**
         * Use this shader.
         */
        public use(): void {
            gl.useProgram(this._program);
        }

        /**
         * Load the Shader
         * @param source Shader Source.
         * @param shaderType Shader Type.
         * @returns 
         */
        private Load(source: string, shaderType: number): WebGLShader {
            let shader: WebGLShader = gl.createShader(shaderType) as WebGLShader;

            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            let error = gl.getShaderInfoLog(shader);

            if (error !== "") {
                throw new Error("Error compiling shader '" + this._name + "': " + error);
            } else {
                console.log("Successfully compiled shader.");
            }

            return shader;
        }

        /**
         * Create the Program.
         * @param vertexShader vertexShader.
         * @param fragmentShader fragmentShader.
         */
        private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
            this._program = gl.createProgram() as WebGLProgram;

            gl.attachShader(this._program, vertexShader);
            gl.attachShader(this._program, fragmentShader);
            gl.linkProgram(this._program);

            let error = gl.getProgramInfoLog(this._program);
            if (error !== "") {
                throw new Error("Error linking shader '" + this._name + "': " + error);
            } else {
                console.log("Successfully linked shader.");
            }
        }
    }
}