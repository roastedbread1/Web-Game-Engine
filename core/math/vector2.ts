namespace TSE {
    //represents a 2-component vector
    export class Vector2 {
        private _x: number;
        private _y: number;

        /**
         * creates a new vector 2
         * @param x
         * @param y
         */
        public constructor(x: number = 0, y: number = 0) {
            this._x = x;
            this._y = y;
        }
        //get element x
        public get x(): number {
            return this._x;
        }
        // set element x
        public set x(value: number) {
            this._x = value;
        }
        //get element y

        public get y(): number {
            return this._y;
        }
        // set element y
        public set y(value: number) {
            this._y = value;
        }
 
        
        // get vector 3 elements in a form of an array
        public toArray(): number[] {
            return [this._x, this._y];
        }
        // get vector 3 elements in a form of a float32array
        public toFloat32Array(): Float32Array {
            return new Float32Array(this.toArray());
        }
    }
}