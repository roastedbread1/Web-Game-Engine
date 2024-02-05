namespace TSE {

    //describe the state of the zone
    export enum ZoneState {
        UNINITIALIZED,
        LOADING, 
        UPDATING
    }

    export class Zone {
        private _id: number;
        private _name: string;
        private _description: string;
        private _scene: Scene;
        private _state: ZoneState = ZoneState.UNINITIALIZED;

        public constructor(id: number, name: string, description: string) {
            this._id = id;
            this._name = name;
            this._description = description;
            this._scene = new Scene();

         
        }
        //get the zone id
        public get id(): number {
            return this._id;
        }
        //get the name of the zone
        public get name(): string {
            return this._name;
        }
        //get the description of a zone
        public get description(): string {
            return this._description;
        }
        //get the scene of the zone
        public get scene(): Scene {
            return this._scene;
        }
        //load the zone
        public load(): void {
            this._state = ZoneState.LOADING;
            this._scene.load();
            this._state = ZoneState.UPDATING;
        }

        public unload(): void {

        }

        //update the zone, checks if the state is updating first
        public update(time: number): void {
            if (this._state === ZoneState.UPDATING) {

            this._scene.update(time);
            }
        }
        //render the zone, checks if the state is updating first 
        public render(shader: Shader): void {
            if (this._state === ZoneState.UPDATING) {

            this._scene.render(shader);
            }
        }

        public onActivated(): void {

        }

        public onDeactivated(): void {

        }
    }
}