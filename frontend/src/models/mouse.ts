import { Action, Position } from "@/models/constants";

export interface MouseMove {
    action: Action;
    uname: string
    position: Position
}