import {
	type MouseEvent,
	type Ref,
	useCallback,
	useEffect,
	useRef,
} from "react";
import type { Position } from "@/models/constants";
import type { Data } from "@/models/data";
import WhiteboardWS from "@/utils/ws";
import useTools from "../useTools";
import useWSHandlers from "../useWSHandlers";

export default function useWhiteboard() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const contextRef = useRef<CanvasRenderingContext2D | null>(null);

	const wsRef = useRef<WhiteboardWS | null>(null);
	if (wsRef.current === null) {
		wsRef.current = new WhiteboardWS();
	}
	const ws = wsRef.current;

	const sendData = useCallback((d: Data) => ws.sendData(d), [ws]);

	const { tools, currentTool, setTool } = useTools(sendData);
	const currentToolRef = useRef(currentTool);

	const { strokeHandler } = useWSHandlers(contextRef);

	const position: Ref<Position> = useRef([0, 0]);

	// Initial rendering of whiteboard
	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas === null) {
			return;
		}

		const context = canvas.getContext("2d");

		canvas.height = window.innerHeight;
		canvas.width = window.innerWidth;
		canvas.style.width = `${window.innerWidth}px`;
		canvas.style.height = `${window.innerHeight}px`;

		contextRef.current = context;

		ws.registerHandler(strokeHandler);
	}, [ws.registerHandler, strokeHandler, ws]);

	useEffect(() => {
		currentToolRef.current = currentTool;
	}, [currentTool]);

	const mouseMoveHandler = useCallback((e: MouseEvent<HTMLCanvasElement>) => {
		if (contextRef.current === null) return;
		if (canvasRef.current === null) return;
		if (currentToolRef.current === null) return;

		const rect = canvasRef.current?.getBoundingClientRect();

		position.current = [e.clientX - rect.x, e.clientY - rect.y];

		currentToolRef.current.handleMouseMove(
			contextRef.current,
			position.current,
		);
	}, []);

	const mouseDownHandler = useCallback(() => {
		if (position.current === null) return;
		if (contextRef.current === null) return;
		if (currentToolRef.current === null) return;

		currentToolRef.current.handleMouseDown(
			contextRef.current,
			position.current,
		);
	}, []);

	const mouseUpHandler = useCallback(() => {
		if (contextRef.current === null) return;
		if (position.current === null) return;
		if (currentToolRef.current === null) return;

		currentToolRef.current.handleMouseUp(contextRef.current, position.current);
	}, []);

	return {
		canvasRef,
		contextRef,
		tools,
		currentTool,
		setTool,
		currentToolRef,
		strokeHandler,
		mouseDownHandler,
		mouseMoveHandler,
		mouseUpHandler,
		sendData,
	};
}
