import type { IconVariant } from "@/app/ui/components/icons";
import type { Position } from "@/models/constants";
import { Tool } from "./tool";

export class Eraser extends Tool {
	public icon: IconVariant = "eraser";
	public cursorIcon: IconVariant = "eraser";

	handleMouseDown(_ctx: CanvasRenderingContext2D, _p: Position): void {
		console.log("eraser down");
	}

	handleMouseMove(_ctx: CanvasRenderingContext2D, _p: Position): void {
		console.log("eraser move");
	}

	handleMouseUp(_ctx: CanvasRenderingContext2D, _p: Position): void {
		console.log("eraser up");
	}
}
