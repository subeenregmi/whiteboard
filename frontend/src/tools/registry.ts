import { Action } from "@/models/constants";
import type { Data } from "@/models/data";
import type { Stroke } from "@/models/stroke";
import type { HandMove } from "../models/hand-move";
import { Eraser } from "./eraser";
import { Hand } from "./hand";
import { Pen } from "./pen";

export type Tools = {
	hand: Hand;
	pen: Pen;
	eraser: Eraser;
};

export const ToolNames: (keyof Tools)[] = ["hand", "pen", "eraser"];

export function newTools(sendData: (d: Data) => void): Tools {
	const sendStroke = (s: Stroke) => {
		sendData({
			action: Action.Stroke,
			data: s,
		});
	};

	const sendHandMove = (h: HandMove) => {
		sendData({
			action: Action.HandMove,
			data: h,
		});
	};

	return {
		hand: new Hand(sendHandMove),
		pen: new Pen(sendStroke),
		eraser: new Eraser(),
	};
}
