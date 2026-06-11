import { Eraser } from "./eraser";
import { Hand } from "./hand";
import { Pen } from "./pen";

export type Tools = {
	hand: Hand;
	pen: Pen;
	eraser: Eraser;
};

export const ToolNames: (keyof Tools)[] = ["hand", "pen", "eraser"];

export function newTools(): Tools {
	return {
		hand: new Hand(),
		pen: new Pen(),
		eraser: new Eraser(),
	};
}
