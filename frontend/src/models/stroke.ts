import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { Pen } from "./pen";
import { Position } from "./constants";

export interface Stroke {
    id: number;
    uname: string;
    timestamp?: Timestamp;
    coordinates: Position[];
    pen: Pen;
}
