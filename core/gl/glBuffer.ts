namespace TSE {
    /**
     * repserent the information needed for a GLBuffer attribute
     */
    export class AttributeInfo {
        public location: number; // location of this attribute
        public size: number; //size of elements in this attribute (i.e vector3 = 3)
        public offset: number; // number of elements from the beginning of the buffer aka where it starts
    }

    /**
     * represents a WebGL Buffer
     */
    export class GLBuffer {
        private _hasAttributeLocation: boolean = false;
        private _elementSize: number;
        private _stride: number;
        private _buffer: WebGLBuffer;
        private _targetBufferType: number;
        private _dataType: number;
        private _mode: number;
        private _typeSize: number;

        private _data: number[] = [];
        private _attributes: AttributeInfo[] = [];

        /**
         * 
         * creates a new gl buffer
         * @param elemenSize size of each element in this buffer
         * @param dataType data type of this buffer. default: gl.float
         * @param targetBufferType buffer target type. gl.ARRAY_BUFFER or gl.ELEMENT_ARRAY_BUFFER. Default = gl.ARRAY_BUFFER
         * @param mode drawing mode of this buffer. default = gl.TRIANGLES
         */
        public constructor(elementSize: number, dataType: number = gl.FLOAT, targetBufferType: number = gl.ARRAY_BUFFER, mode: number = gl.TRIANGLES) {
            this._elementSize = elementSize;
            this._dataType = dataType;
            this._targetBufferType = targetBufferType;
            this._mode = mode;

            // determine byte size
            switch (this._dataType) {
                case gl.FLOAT:
                case gl.INT:
                case gl.UNSIGNED_INT:
                    this._typeSize = 4;
                    break;
                case gl.SHORT:
                case gl.UNSIGNED_SHORT:
                    this._typeSize = 2;
                    break;
                case gl.BYTE:
                case gl.UNSIGNED_BYTE:
                    this._typeSize = 1;
                    break;
                default:
                    throw new Error("unrecognized data type: " + dataType.toString());
            }
            this._stride = this._elementSize * this._typeSize;
            this._buffer = gl.createBuffer();
        }


        /**
         * terminate buffer
         */
        public destroy(): void {
            gl.deleteBuffer(this._buffer);
        }


        /**
         *  binds this buffer
         * @param normalized indicates if the data shoudl be normalized. defaulted to false. 
         */
        public bind(normalized: boolean = false): void {
            gl.bindBuffer(this._targetBufferType, this._buffer);

            if (this._hasAttributeLocation) {
                for (let it of this._attributes) {
                    gl.vertexAttribPointer(it.location, it.size, this._dataType, normalized, this._stride, it.offset * this._typeSize);
                    gl.enableVertexAttribArray(it.location);
                }
            }
        }
        /** unbind this buffer.
         * 
         */
        public unbind(): void {
            for (let it of this._attributes) {
                gl.disableVertexAttribArray(it.location);
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer)
        }
        /**
         * adds an attribute with the provided information to this buffer.
         * @param info the information to be added.
         */

        public addAttributeLocation(info: AttributeInfo): void {
            this._hasAttributeLocation = true;
            this._attributes.push(info);
        }

        /**
         * add data to this buffer.
         * @param data
         */
        public pushBackData(data: number[]): void {
            for (let d of data) {
                this._data.push(d);
            }
        }
        /** uploads this buffer's data to the GPU*/
        public upload(): void {
            gl.bindBuffer(this._targetBufferType, this._buffer);

            let bufferData: ArrayBuffer;
            switch (this._dataType) {
                case gl.FLOAT:
                    bufferData = new Float32Array(this._data)
                    break;
                case gl.INT:
                    bufferData = new Int32Array(this._data)
                    break;
                case gl.UNSIGNED_INT:
                    bufferData = new Uint32Array(this._data)
                    break;
                case gl.SHORT:
                    bufferData = new Int16Array(this._data)
                    break;
                case gl.UNSIGNED_SHORT:
                    bufferData = new Uint16Array(this._data)
                    break;
                case gl.BYTE:
                    bufferData = new Int8Array(this._data)
                    break;
                case gl.UNSIGNED_BYTE:
                    bufferData = new Uint8Array(this._data)
                    break;
            }
            gl.bufferData(this._targetBufferType, bufferData, gl.STATIC_DRAW);
        }
        /**
         * draw this buffer
         */
        public draw(): void {
            if (this._targetBufferType === gl.ARRAY_BUFFER) {
                gl.drawArrays(this._mode, 0, this._data.length / this._elementSize); //third argument is the number of element

            } else if (this._targetBufferType === gl.ELEMENT_ARRAY_BUFFER) {
                gl.drawElements(this._mode, this._data.length, this._dataType, 0);
            }
        }

    }
}