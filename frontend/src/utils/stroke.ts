import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface Stroke {
    id: number;
    uname: string;
    timestamp: Timestamp;
    coordinates: [number, number][];
    color: string;
    width: number;
}