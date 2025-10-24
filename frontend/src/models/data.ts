import { Action } from "./constants";
import { Erase } from "./erase";
import { Stroke } from "./stroke";

export interface StrokeData {
    Action: Action.Stroke;
    Data: Stroke;
}

export interface EraseData {
    Action: Action.Erase;
    Data: Erase;
}

export type Data = StrokeData | EraseData;
