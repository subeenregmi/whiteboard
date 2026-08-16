import { type RefObject, useCallback, useMemo } from "react";
import {
	Action,
	Colors,
	DEFAULT_LINE_CAP,
	DEFAULT_LINE_JOIN,
	ThicknessValues,
} from "@/models/constants";
import type { Data, DataHandler } from "@/models/data";
import type { HandMove } from "@/models/hand-move";
import type { Stroke } from "@/models/stroke";

function strokeHandler(ctx: CanvasRenderingContext2D | null, s: Stroke) {
	if (ctx === null) {
		return;
	}

	ctx.strokeStyle = Colors[s.pen.color].rgb;
	ctx.lineWidth = ThicknessValues[s.pen.thickness].weight;
	ctx.lineCap = DEFAULT_LINE_CAP;
	ctx.lineJoin = DEFAULT_LINE_JOIN;

	ctx.beginPath();
	ctx.moveTo(...s.coordinates[0]);
	ctx.stroke();
	for (const pos of s.coordinates.slice(1)) {
		ctx.lineTo(...pos);
		ctx.stroke();
	}
}

function handMoveHandler(ctx: CanvasRenderingContext2D | null, h: HandMove) {
	if (ctx === null) return;

	ctx.fillRect(h.position[0], h.position[1], 25, 25);
}

export default function useWSHandlers(
	ctxRef: RefObject<CanvasRenderingContext2D | null>,
): { strokeHandler: DataHandler; handMoveHandler: DataHandler } {
	const handleStroke = useCallback(
		(s: Stroke) => strokeHandler(ctxRef.current, s),
		[ctxRef],
	);

	const handleHandMove = useCallback(
		(h: HandMove) => handMoveHandler(ctxRef.current, h),
		[ctxRef],
	);

	return useMemo(
		() => ({
			strokeHandler: { action: Action.Stroke, handler: handleStroke },
			handMoveHandler: { action: Action.HandMove, handler: handleHandMove },
		}),
		[handleStroke, handleHandMove],
	);
}
