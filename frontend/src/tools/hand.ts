import { v4 } from "uuid";
import type { IconVariant } from "@/app/ui/components/icons";
import type { Position } from "@/models/constants";
import type { HandMove } from "../models/hand-move";
import { Tool } from "./tool";

export class Hand extends Tool {
	public icon: IconVariant = "hand";
	public cursorIcon: IconVariant = "none";
	public send: (s: HandMove) => void;
	public id: string;

	constructor(send: (s: HandMove) => void) {
		super();
		this.send = send;
		this.id = v4();
	}

	handleMouseDown(_ctx: CanvasRenderingContext2D, _p: Position): void {
		console.log("hand down");
	}

	handleMouseMove(_ctx: CanvasRenderingContext2D, p: Position): void {
		console.log("hand move");

		const h: HandMove = {
			id: this.id,
			position: p,
		};

		this.send(h);
	}

	handleMouseUp(_ctx: CanvasRenderingContext2D, _p: Position): void {
		console.log("hand up");
	}
}
