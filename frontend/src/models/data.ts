import type { Action } from "./constants";
import type { Erase } from "./erase";
import type { HandMove } from "./hand-move";
import type { Stroke } from "./stroke";

export type ActionDataMap = {
	[Action.Stroke]: Stroke;
	[Action.Erase]: Erase;
	[Action.HandMove]: HandMove;
};

export type Data = {
	[A in Action]: { action: A; data: ActionDataMap[A] };
}[Action];

export type DataHandler = {
	[A in Action]: { action: A; handler: (d: ActionDataMap[A]) => void };
}[Action];

export type DataHandlerMap = {
	[A in Action]: (d: ActionDataMap[A]) => void;
};
