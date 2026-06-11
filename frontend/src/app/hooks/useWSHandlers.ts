import { type RefObject, useCallback, useMemo } from "react";
import {
	Action,
	Colors,
	DEFAULT_LINE_CAP,
	DEFAULT_LINE_JOIN,
	ThicknessValues,
} from "@/models/constants";
import type { DataHandler } from "@/models/data";
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
	s.coordinates.slice(1).map((pos) => {
		ctx.lineTo(...pos);
		ctx.stroke();
	});
}

export default function useWSHandlers(
	ctxRef: RefObject<CanvasRenderingContext2D | null>,
): { strokeHandler: DataHandler } {
	const handler = useCallback(
		(s: Stroke) => strokeHandler(ctxRef.current, s),
		[ctxRef],
	);

	return useMemo(
		() => ({
			strokeHandler: { action: Action.Stroke, handler },
		}),
		[handler],
	);
}
