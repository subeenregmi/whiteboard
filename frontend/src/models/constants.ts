export const SCALE_FACTOR: number = 2;
export const MIN_STROKE_WIDTH: number = 1;
export const MAX_STROKE_WIDTH: number = 100;

export type Position = [number, number];

export enum Action {
    Stroke = 1,
    MouseMove = 2,
}