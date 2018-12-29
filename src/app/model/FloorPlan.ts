import { Desk } from "./Desk";

export class FloorPlan {
    floorWidth: number
    floorHeight: number
    maxDesks: number = 50;
    deskList: Desk[]
}