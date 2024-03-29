///<reference path="./zone.ts" />
// or you can just import but that doesnt look sexy,  import { Zone } from "./Zone";

namespace TSE {
    export class TestZone extends Zone {
        private _sprite: Sprite;
        public load(): void {
            this._sprite = new Sprite("test", "wood");
            this._sprite.load();
            this._sprite.position.x = 300;
            this._sprite.position.y = 200;

            super.load();
        } 

        public render(shader: Shader): void {
            this._sprite.draw(shader);
            super.render(shader);
        }
    }
}