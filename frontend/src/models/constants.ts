export const SCALE_FACTOR: number = 2;
export const MIN_STROKE_WIDTH: number = 1;
export const MAX_STROKE_WIDTH: number = 100;

export const DEFAULT_STYLE = "round";

export type Position = [number, number];

export enum Action {
	Stroke = 1,
	Erase = 2,
}

export const Colors = {
	black: {
		rgb: "#000000",
		className: "text-black-500",
	},
	red: {
		rgb: "#ef4444",
		className: "text-red-500",
	},
	blue: {
		rgb: "#3b82f6",
		className: "text-blue-500",
	},
	green: {
		rgb: "#22c55e",
		className: "text-green-500",
	},
} as const;

export type Color = keyof typeof Colors;

export const ThicknessValues = {
	sm: {
		weight: 7,
		className: "stroke-[0]",
	},
	md: {
		weight: 14,
		className: "stroke-[0.75em]",
	},
	lg: {
		weight: 21,
		className: "stroke-[1.25em]",
	},
};

export type Thickness = keyof typeof ThicknessValues;
