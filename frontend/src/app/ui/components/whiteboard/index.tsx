"use client";

import { type Ref, useCallback, useEffect, useRef } from "react";
import useTools from "@/app/hooks/useTools";
import Toolbar from "@/app/ui/components/toolbar/toolbar";
import type { Position } from "@/models/constants";
import { IconToCursor } from "../icon";

export default function Whiteboard() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const contextRef = useRef<CanvasRenderingContext2D | null>(null);

	const { tools, currentTool, setTool } = useTools();
	const currentToolRef = useRef(currentTool);

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

		contextRef.current = context!;
	}, []);

	useEffect(() => {
		currentToolRef.current = currentTool;
	}, [currentTool]);

	const mouseMoveHandler = useCallback((e: any) => {
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

	return (
		<div className="relative">
			<Toolbar
				currentTool={currentTool}
				setTool={setTool}
				tools={tools.current}
			/>
			<canvas
				ref={canvasRef}
				style={{ cursor: IconToCursor(currentTool.cursorIcon) }}
				className="bg-white "
				onMouseMove={mouseMoveHandler}
				onMouseDown={mouseDownHandler}
				onMouseUp={mouseUpHandler}
				draggable={false}
			/>
		</div>
	);
}
