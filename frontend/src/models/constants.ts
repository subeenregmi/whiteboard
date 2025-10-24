export const SCALE_FACTOR: number = 2;
export const MIN_STROKE_WIDTH: number = 1;
export const MAX_STROKE_WIDTH: number = 100;

export const DEFAULT_COLOR = "black";
export const DEFAULT_THICKNESS = 10;
export const DEFAULT_STYLE = "round";

export type Position = [number, number];

export enum Action {
    Stroke = 1,
    Erase = 2,
}
