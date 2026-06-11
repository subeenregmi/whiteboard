import type { IconVariant } from "@/app/ui/components/icon";
import type { Position } from "@/models/constants";
import { Tool } from "./tool";

export class Hand extends Tool {
	public icon: IconVariant = "hand";
	public cursorIcon: IconVariant = "none";

	handleMouseDown(_ctx: CanvasRenderingContext2D, _p: Position): void {
		console.log("hand down");
	}

	handleMouseMove(_ctx: CanvasRenderingContext2D, _p: Position): void {
		console.log("hand move");
	}

	handleMouseUp(_ctx: CanvasRenderingContext2D, _p: Position): void {
		console.log("hand up");
	}
}
