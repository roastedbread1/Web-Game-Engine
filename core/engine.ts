    namespace TSE {
        /**
         * the main engine class
         */
        export class Engine {

            private _canvas: HTMLCanvasElement;
            private _basicShader: BasicShader;
          

            private _projection: Matrix4x4;

            /**
             *  creates a new engine
        
             */
            public constructor() {
            }
            /**
             * starts the engine
             */
            public start(): void {
                this._canvas = GLUtilities.initialize(); //initialize the canvas
                AssetManager.initialize(); //initialize asset manager
                gl.clearColor(0, 0, 0, 1); //set clear color to black
                this._basicShader = new BasicShader(); //create an instance of basicshader
                this._basicShader.use(); //set basicshader as the active shader


                //load materials
                MaterialManager.registermaterial(new Material("wood", "assets/textures/wood.jpg", new Color(0, 0, 255, 255))); //register material
                let ZoneID = ZoneManager.createTestZone(); //create a testzone

                // load
                this._projection = Matrix4x4.orthographic(0, this._canvas.width, this._canvas.height, 0, -100.0, 100.0); //initialize ortographic projection based on the canvas size

                ZoneManager.changeZone(ZoneID); //set the initial zone

                this.resize(); //call resize to handle initial canvas resizing
                this.loop(); //initiates the game loop
            
            }
            /** resizes the canvas to fit to window*/
            public resize(): void {
                if (this._canvas !== undefined) {
                    this._canvas.width = window.innerWidth;
                    this._canvas.height = window.innerHeight;

                    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
                    this._projection = Matrix4x4.orthographic(0, this._canvas.width, this._canvas.height, 0, -100.0, 100.0);
                }
            }

            private loop(): void {
                MessageBus.update(0);

                ZoneManager.update(0);
               
               // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

                gl.clear(gl.COLOR_BUFFER_BIT);
                ZoneManager.render(this._basicShader);
                //set uniforms.
              
                let projectionPosition = this._basicShader.getUniformLocation("u_projection");
                gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));

                requestAnimationFrame(this.loop.bind(this));
            }
        }
    }