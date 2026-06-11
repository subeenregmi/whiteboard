import type { Position } from "./constants";
import type { Pen } from "./pen";

export interface Stroke {
	id: string;
	coordinates: Position[];
	pen: Pen;
}
