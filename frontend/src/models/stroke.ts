import type { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import type { Position } from "./constants";
import type { Pen } from "./pen";

export interface Stroke {
	id: number;
	timestamp?: Timestamp;
	coordinates: Position[];
	pen: Pen;
}
