import type { IconVariant } from "@/app/ui/components/icons";
import type { Position } from "@/models/constants";

export abstract class Tool {
	abstract icon: IconVariant;
	abstract cursorIcon: IconVariant;
	menu?: () => React.ReactNode;
	abstract handleMouseDown(ctx: CanvasRenderingContext2D, p: Position): void;
	abstract handleMouseUp(ctx: CanvasRenderingContext2D, p: Position): void;
	abstract handleMouseMove(ctx: CanvasRenderingContext2D, p: Position): void;
}
