import { Action, Position } from "./constants";

export interface Cursor {
  Position: Position;
  CurrentAction: Action;
}
