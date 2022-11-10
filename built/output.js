window.onload = (function () {
    var engine = new HZD.Engine();
    engine.start();
});
window.onresize = function () {
    var engine = new HZD.Engine();
    engine.resize();
};
var HZD;
(function (HZD) {
    /**
     * Main Engine Class.
     */
    var Engine = /** @class */ (function () {
        /**
         * Creates a new engine.
         */
        function Engine() {
        }
        /**
         * Resizes to fit the window
         */
        Engine.prototype.resize = function () {
            if (this._canvas !== undefined) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerWidth;
            }
        };
        /**
         * Start the engine.
         */
        Engine.prototype.start = function () {
            HZD.WebGL.initialize();
            HZD.gl.clearColor(0, 0, 0, 1);
            this.loadShaders();
            this._shader.use();
            this.loop();
        };
        /**
         * Main Game Loop.
         */
        Engine.prototype.loop = function () {
            HZD.gl.clear(HZD.gl.COLOR_BUFFER_BIT);
            requestAnimationFrame(this.loop.bind(this));
        };
        Engine.prototype.loadShaders = function () {
            var vertexShaderSource = "\n                attribute vec3 a_position;\n\n                void main() {\n                    gl_Position = vec4(a_position, 1.0);\n                }\n            ";
            var fragmentShaderSource = "\n                precision mediump float;\n\n                void main() {\n                    gl_FragColor = vec4(1.0);\n                }\n            ";
            this._shader = new HZD.Shader("basic", vertexShaderSource, fragmentShaderSource);
        };
        return Engine;
    }());
    HZD.Engine = Engine;
})(HZD || (HZD = {}));
var HZD;
(function (HZD) {
    /**
     * Main Shader Class
     */
    var Shader = /** @class */ (function () {
        /**
         * Create a new shader.
         * @param name Name of the shader.
         * @param vertexShaderSource Source of the vertex Shader.
         * @param fragmentShaderSource Source of the fragment Shader.
         */
        function Shader(name, vertexShaderSource, fragmentShaderSource) {
            this._name = name;
            var vertexShader = this.Load(vertexShaderSource, HZD.gl.VERTEX_SHADER);
            var fragmentShader = this.Load(fragmentShaderSource, HZD.gl.FRAGMENT_SHADER);
            this.createProgram(vertexShader, fragmentShader);
        }
        /**
         * Name of the shader.
         */
        Shader.prototype.name = function () {
            return this._name;
        };
        /**
         * Use this shader.
         */
        Shader.prototype.use = function () {
            HZD.gl.useProgram(this._program);
        };
        /**
         * Load the Shader
         * @param source Shader Source.
         * @param shaderType Shader Type.
         * @returns
         */
        Shader.prototype.Load = function (source, shaderType) {
            var shader = HZD.gl.createShader(shaderType);
            HZD.gl.shaderSource(shader, source);
            HZD.gl.compileShader(shader);
            var error = HZD.gl.getShaderInfoLog(shader);
            if (error !== "") {
                throw new Error("Error compiling shader '" + this._name + "': " + error);
            }
            else {
                console.log("Successfully compiled shader.");
            }
            return shader;
        };
        /**
         * Create the Program.
         * @param vertexShader vertexShader.
         * @param fragmentShader fragmentShader.
         */
        Shader.prototype.createProgram = function (vertexShader, fragmentShader) {
            this._program = HZD.gl.createProgram();
            HZD.gl.attachShader(this._program, vertexShader);
            HZD.gl.attachShader(this._program, fragmentShader);
            HZD.gl.linkProgram(this._program);
            var error = HZD.gl.getProgramInfoLog(this._program);
            if (error !== "") {
                throw new Error("Error linking shader '" + this._name + "': " + error);
            }
            else {
                console.log("Successfully linked shader.");
            }
        };
        return Shader;
    }());
    HZD.Shader = Shader;
})(HZD || (HZD = {}));
var HZD;
(function (HZD) {
    /**
     * Webgl Initializing Class.
     */
    var WebGL = /** @class */ (function () {
        function WebGL() {
        }
        /**
         * Initialize Webgl.
         * @param element
         */
        WebGL.initialize = function (element) {
            var canvas;
            if (element !== undefined) {
                canvas = document.getElementById(element);
                if (canvas === undefined)
                    throw new Error("Cannot find a Canvas elementId named: " + element);
            }
            else {
                canvas = document.createElement("canvas");
                document.body.appendChild(canvas);
            }
            HZD.gl = canvas.getContext("webgl2");
            if (HZD.gl === undefined)
                throw new Error("Unable to initialize Webgl.");
        };
        return WebGL;
    }());
    HZD.WebGL = WebGL;
})(HZD || (HZD = {}));
