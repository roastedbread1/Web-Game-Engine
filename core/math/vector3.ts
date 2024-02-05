namespace TSE {
    export class Vector3 {
        private _x: number;
        private _y: number; 
        private _z: number; 

        public constructor(x: number = 0, y: number = 0, z: number = 0) {
            this._x = x;
            this._y = y;
            this._z = z;
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
        //get element z

        public get z(): number {
            return this._z;
        }
        // set element z
        public set z(value: number) {
            this._z = value;
        }

        public static get zero(): Vector3 {
            return new Vector3();
        }

        public static get one(): Vector3 {
            return new Vector3(1, 1, 1);
        }

        // get vector 3 elements in a form of an array
        public toArray(): number[] {
            return [this._x, this._y, this._z];
        }
        // get vector 3 elements in a form of a float32array
        public toFloat32Array(): Float32Array {
            return new Float32Array(this.toArray());
        }

        public copyFrom(vector: Vector3): void {
            this._x = vector._x;
            this._y = vector._y
            this._z = vector._z
            
        }

  }
}