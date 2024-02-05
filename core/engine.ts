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
                this._canvas = GLUtilities.initialize();
                AssetManager.initialize();
                gl.clearColor(0, 0, 0, 1);
                this._basicShader = new BasicShader();
                this._basicShader.use();

                let ZoneID = ZoneManager.createZone("testZone", "zone for testing");
                ZoneManager.changeZone(ZoneID);

                //load materials
                MaterialManager.registermaterial(new Material("wood", "assets/textures/wood.jpg", new Color(0, 128, 255, 255)));
                // load
                this._projection = Matrix4x4.orthographic(0, this._canvas.width, this._canvas.height, 0, -100.0, 100.0);


                this.resize();
                this.loop();
            
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