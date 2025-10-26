import { Action } from "./constants";
import { Cursor } from "./cursor";
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

export interface CursorData {
  Action: Action.CursorMove;
  Data: Cursor;
}

export type Data = StrokeData | EraseData | CursorData;
