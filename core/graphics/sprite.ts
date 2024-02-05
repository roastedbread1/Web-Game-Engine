namespace TSE {


    /**
     * 2 dimensional sprite that is drawn on the screen
     */
    export class Sprite {

        private _name: string;
        private _width: number;
        private _height: number;


        public position: Vector3 = new Vector3();

        /**data container for the vertices*/
        private _buffer: GLBuffer;
        private _materialName: string;
        private _texture: Texture;
        private _material: Material;

        /**
         * creates a new sprite
         * @param name
         * @param materialName
         * @param width
         * @param height
         */
        public constructor(name: string, materialName: string, width: number = 100, height: number = 100 ) {
            this._name = name;
            this._materialName = materialName;
            this._width = width;
            this._height = height;
            this._material = MaterialManager.getMaterial(this._materialName);
           
        }

        public get name() {
            return this._name;
        }
        s
        public destroy(): void {
            this._buffer.destroy();
            MaterialManager.releaseMaterial(this._materialName);
            this._material = undefined;
            this._materialName = undefined;
        }

        /**
         * performs loading routine
         */
        public load(): void {
            this._buffer = new GLBuffer(5);

            let positionAttribute = new AttributeInfo();
            positionAttribute.location = 0;
            positionAttribute.offset = 0;
            positionAttribute.size = 3;
            this._buffer.addAttributeLocation(positionAttribute);


            let texCoordAttribute = new AttributeInfo();
            texCoordAttribute.location = 1;
            texCoordAttribute.offset = 3;
            texCoordAttribute.size = 2;
            this._buffer.addAttributeLocation(texCoordAttribute);
            let vertices = [
                // x, y, z, u , v
                0, 0, 0, 0, 0,

                0, this._height, 0, 0, 1.0,
                this._width, this._height, 0, 1.0, 1.0,

                this._width, this._height, 0, 1.0, 1.0,
                this._width, 0, 0, 1.0, 0,
                0, 0, 0 , 0, 0


            ];
            this._buffer.pushBackData(vertices);
            this._buffer.upload();
            this._buffer.unbind();
        }

        public update(time: number) : void {

        }

        public draw(shader: Shader): void {

            let modelLocation = shader.getUniformLocation("u_model");
            gl.uniformMatrix4fv(modelLocation, false, new Float32Array(Matrix4x4.translation(this.position).data))

            let colorLocation = shader.getUniformLocation("u_tint");

            gl.uniform4fv(colorLocation, this._material.tint.toFLoat32Array());

            if (this._material.diffuseTexture !== undefined) {

                this._material.diffuseTexture.activateAndBind(0);
                let diffuseLocation = shader.getUniformLocation("u_diffuse");
                gl.uniform1i(diffuseLocation, 0); //0 represents the texture its at

            }
            this._buffer.bind();
            this._buffer.draw();
        }
    }
}