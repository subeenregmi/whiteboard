"use client";

import useWhiteboard from "@/app/hooks/whiteboard/useWhiteboard";
import Toolbar from "@/app/ui/components/toolbar/toolbar";
import { IconToCursor } from "../icons";

export default function Whiteboard() {
	const {
		currentTool,
		setTool,
		tools,
		canvasRef,
		mouseDownHandler,
		mouseMoveHandler,
		mouseUpHandler,
	} = useWhiteboard();

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
