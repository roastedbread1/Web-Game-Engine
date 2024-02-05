namespace TSE {
    export class SimObject {
        private _id: number;
        private _children: SimObject[] = [];
        private _parent: SimObject;
        private _isLoaded: boolean = false;
        private _scene: Scene;


        private _localMatrix: Matrix4x4 = Matrix4x4.identity();
        private _worldMatrix: Matrix4x4 = Matrix4x4.identity();


        public name: string;
        public transform: Transform = new Transform();

        public constructor(id: number, name: string, scence? : Scene) {
            this._id = id;
            this.name = name;
            this._scene = scence;
        }

        public get id(): number {
            return this._id;
        }

        public get parent(): SimObject {
            return this._parent;
        }

        public get isLoaded(): boolean {
            return this._isLoaded
        }

        public get worldMatrix(): Matrix4x4 {
            return this._worldMatrix;
        }

        public addChild(child: SimObject): void {
            child._parent = this;
            this._children.push(child);
            child.onAdded(this._scene);
        }

        public removeChild(child: SimObject): void {
            let index = this._children.indexOf(child); 
            if ( index !== -1) {
                child._parent = undefined;
                this._children.splice(index, 1);
            }

        }

        public getObjectByName(name: string): SimObject {
            if (this.name === name) {
                return this;
            }

            for (let c of this._children) {
                //search for object recursively
                let result = c.getObjectByName(name);
                if (result !== undefined) {
                    return result;
                }
            }

            return undefined;
        }

        public load(): void {
            this._isLoaded = true;

            for (let c of this._children) {
                c.load();
            }
        }

        public update(time: number): void { 
            for (let c of this._children) {
                c.update(time);
            }
        }

        public render(shader : Shader): void {
            for (let c of this._children) {
                c.render(shader);
            }
        }

        protected onAdded(scene: Scene): void {
            this._scene = scene;
        }
    }
}