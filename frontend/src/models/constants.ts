export const SCALE_FACTOR: number = 2;
export const MIN_STROKE_WIDTH: number = 1;
export const MAX_STROKE_WIDTH: number = 100;

export const DEFAULT_COLOR = "#000000";
export const DEFAULT_THICKNESS = 10;
export const DEFAULT_STYLE = "round";

export const PRESET_COLORS = [
  "#000000", // black
  "#FFFFFF", // white
  "#EF4444", // red
  "#F97316", // orange
  "#EAB308", // yellow
  "#22C55E", // green
  "#3B82F6", // blue
  "#A855F7", // purple
  "#EC4899", // pink
  "#6B7280", // gray
];

export type Position = [number, number];

export enum Action {
  Stroke = 1,
  Erase = 2,
}
