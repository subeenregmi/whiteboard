import type { IconVariant } from "@/app/ui/components/icon";
import PenSubMenu from "@/app/ui/components/toolbar/pen";
import type { Color, Position, Thickness } from "@/models/constants";
import { Colors, ThicknessValues } from "@/models/constants";
import { Tool } from "./tool";

const DEFAULT_LINE_CAP: CanvasLineCap = "round";
const DEFAULT_LINE_JOIN: CanvasLineJoin = "round";

export class Pen extends Tool {
	public color: Color;
	public thickness: Thickness;
	public drawing: boolean;
	public icon: IconVariant = "pen";
	public menu = () => <PenSubMenu pen={this} />;
	public cursorIcon: IconVariant = "pen";

	private data: Position[];
	private isDrawingFrame: boolean;

	constructor() {
		super();
		this.color = "black";
		this.thickness = "md";
		this.drawing = false;
		this.data = [];
		this.isDrawingFrame = false;
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

		const _s = (this.data = []);
	}
}
