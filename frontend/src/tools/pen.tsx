import { v4 } from "uuid";
import type { IconVariant } from "@/app/ui/components/icon";
import PenSubMenu from "@/app/ui/components/toolbar/pen";
import type { Color, Position, Thickness } from "@/models/constants";
import {
	Colors,
	DEFAULT_LINE_CAP,
	DEFAULT_LINE_JOIN,
	ThicknessValues,
} from "@/models/constants";
import type { Stroke } from "@/models/stroke";
import { Tool } from "./tool";

export class Pen extends Tool {
	public color: Color;
	public thickness: Thickness;
	public drawing: boolean;
	public icon: IconVariant = "pen";
	public menu = () => <PenSubMenu pen={this} />;
	public cursorIcon: IconVariant = "pen";
	public send: (s: Stroke) => void;

	private data: Position[];
	private isDrawingFrame: boolean;

	constructor(send: (s: Stroke) => void) {
		super();
		this.color = "black";
		this.thickness = "md";
		this.drawing = false;
		this.data = [];
		this.isDrawingFrame = false;
		this.send = send;
	}

	handleMouseMove(ctx: CanvasRenderingContext2D, p: Position) {
		if (!this.drawing) {
			return;
		}

		this.draw(ctx, p);
	}

	draw(ctx: CanvasRenderingContext2D, p: Position) {
		this.data.push(p);

		ctx.lineTo(p[0], p[1]);

		if (!this.isDrawingFrame) {
			this.isDrawingFrame = true;
			requestAnimationFrame(() => {
				ctx.stroke();
				this.isDrawingFrame = false;
			});
		}
	}

	handleMouseDown(ctx: CanvasRenderingContext2D, p: Position): void {
		ctx.strokeStyle = Colors[this.color].rgb;
		ctx.lineWidth = ThicknessValues[this.thickness].weight;
		ctx.lineCap = DEFAULT_LINE_CAP;
		ctx.lineJoin = DEFAULT_LINE_JOIN;

		this.drawing = true;

		ctx.beginPath();
		ctx.moveTo(p[0], p[1]);
		ctx.stroke();

		this.data.push(p);
	}

	handleMouseUp(_ctx: CanvasRenderingContext2D, _p: Position): void {
		this.drawing = false;

		const s: Stroke = {
			id: v4(),
			pen: {
				color: this.color,
				thickness: this.thickness,
			},
			coordinates: this.data,
		};

		this.send(s);

		this.data = [];
	}
}
