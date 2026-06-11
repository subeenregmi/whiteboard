import { useState } from "react";
import { ToolNames, type Tools } from "@/tools/registry";
import type { Tool } from "@/tools/tool";
import cn from "@/utils/cn";
import Icon, { type IconVariant } from "../icon";

export default function Toolbar(props: {
	setTool: (tool: Tool) => void;
	currentTool: Tool;
	tools: Tools;
}) {
	const [colorsVisible, setColorsVisible] = useState(false);

	return (
		<div
			className={cn(
				"bg-gray-50 absolute text-black top-0 left-1/2 -translate-x-1/2 rounded-b-lg shadow-lg border-gray-500 py-3 px-4 ",
			)}
		>
			<div className={"flex justify-around gap-3"}>
				{ToolNames.map((toolName) => (
					<button
						key={toolName}
						onClick={() => {
							const tool = props.tools[toolName];
							if (toolName === "pen") {
								setColorsVisible((prev) => !prev);
							}
							props.setTool(tool);
						}}
					>
						<Icon
							size="1.4em"
							variant={toolName satisfies IconVariant}
							hoverable
						/>
					</button>
				))}
			</div>

			<div
				className={cn(
					"flex justify-center transition-all duration-300 ease-in-out overflow-hidden align-center gap-1",
					colorsVisible ? "max-h-20 opacity-100 pt-2" : "max-h-0 opacity-0",
				)}
			>
				{props.currentTool.menu?.()}
			</div>
		</div>
	);
}
