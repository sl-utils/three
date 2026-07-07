import { Group } from "three";
import { TResource } from "../core/resource/resource";
import { SLTScene, TEvent } from "src/core";
export declare class MeshEarth extends TEvent {
    constructor(tscene: SLTScene, resource: TResource);
    container: Group;
}
