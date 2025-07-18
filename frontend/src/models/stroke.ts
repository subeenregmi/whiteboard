import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { Pen } from "@/models/pen";
import { Action } from "@/models/constants";

export interface Stroke {
    action: Action;
    uname: string;
    timestamp: Timestamp;
    coordinates: [number, number][];
    pen: Pen
}