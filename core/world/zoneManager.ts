namespace TSE {
    export class ZoneManager {
        private static _globalZoneID: number = -1;
        private static _zones: { [id: number]: Zone } = {};

        private static _activeZone: Zone; //there can only be one active zone at a time, it wouldnt make sense to be present at two areas at the same time
        private constructor() {

        }

        public static createZone(name: string, description : string): number {
            ZoneManager._globalZoneID++;
            let zone = new Zone(ZoneManager._globalZoneID, name, description);

            ZoneManager._zones[ZoneManager._globalZoneID] = zone; //assign the newly created zone to the zones hashmap for easier lookup genius if I may say

            return ZoneManager._globalZoneID;
        }

        public static changeZone(id: number): void {
            
            if (ZoneManager._activeZone !== undefined) { //check whether there's an active zone or not
                ZoneManager._activeZone.onDeactivated(); //calling onDeactivated() for the present zone, sort of like a cleanup before activating a new zone
                ZoneManager._activeZone.unload();
            }

            if (ZoneManager._zones[id] !== undefined) { //check the existence of the zone that wants to be activated
                ZoneManager._activeZone = ZoneManager._zones[id];
                ZoneManager._activeZone.onActivated();
            }
        }

        public static update(time: number): void {
            if (ZoneManager._activeZone !== undefined) {
                ZoneManager._activeZone.update(time);
                ZoneManager._activeZone.load();
            }
        }

        public static render(shader: Shader): void {
            if (ZoneManager._activeZone !== undefined) {
                ZoneManager._activeZone.render(shader);
            }
        }
    }
}