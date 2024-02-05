namespace TSE {

    export const MESSAGE_ASSET_LOADER_ASSET_LOADED = "MESSAGE_ASSET_LOADER_ASSET_LOADED"
    export class AssetManager {
        private static _loaders: IAssetLoader[] = [];

        // access the assets by its name in a dictionary
        private static _loadedAssets: { [name: string]: IAsset } = {};


        private constructor() {

        }

        public static initialize(): void {
            AssetManager._loaders.push(new ImageAssetLoader());
        }
        //tell asset manager to add loader                                          
        public static registerLoader(loader: IAssetLoader): void {
            AssetManager._loaders.push(loader);
        }

        public static onAssetLoaded(asset: IAsset): void {
            AssetManager._loadedAssets[asset.name] = asset;
            Message.send(MESSAGE_ASSET_LOADER_ASSET_LOADED + asset.name, this, asset);

        }

        public static loadAsset(assetName: string): void {
            //split the extension name by a period and get the last name convert it to lowercase
            let extension = assetName.split('.').pop().toLocaleLowerCase();
            for (let l of AssetManager._loaders) {
                if (l.supportedExtensions.indexOf(extension) !== -1) {
                    l.loadAsset(assetName);
                    return;
                }
            }

            console.warn("Unable to load asset with extension " + extension + ", no loader is associated with it.");
        }

        public static isAssetLoaded(assetName: string): boolean {
            let status = AssetManager._loadedAssets[assetName] !== undefined;
            return status;
        }

        public static getAsset(assetName: string): IAsset {
            if (AssetManager._loadedAssets[assetName] !== undefined) {
                return AssetManager._loadedAssets[assetName];
            } else {
                AssetManager.loadAsset(assetName);
            }
            return undefined;
        }
 }
}