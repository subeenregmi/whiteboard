import { useRef, useState } from "react";
import type { Data } from "@/models/data";
import { Eraser } from "@/tools/eraser";
import { Hand } from "@/tools/hand";
import { Pen } from "@/tools/pen";
import { newTools, type Tools } from "@/tools/registry";
import type { Tool } from "@/tools/tool";

export default function useTools(sendData: (d: Data) => void) {
	const tools = useRef<Tools>(newTools(sendData));

	const [tool, setToolState] = useState<Tool>(tools.current.hand);

	const setTool = (t: Tool) => {
		if (tool instanceof Hand) {
			tools.current.hand = tool;
		} else if (tool instanceof Pen) {
			tools.current.pen = tool;
		} else if (tool instanceof Eraser) {
			tools.current.eraser = tool;
		}

		setToolState(t);
	};

	return {
		tools,
		currentTool: tool,
		setTool,
	};
}
