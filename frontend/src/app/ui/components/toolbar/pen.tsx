import { useState } from "react";
import {
	type Color,
	type Thickness,
	ThicknessValues,
} from "@/models/constants";
import type { Pen } from "@/tools/pen";
import cn from "@/utils/cn";
import Icon from "../icon";

export default function PenSubMenu(props: { pen: Pen }) {
	const [colorState, setColorState] = useState<Color>("black");
	const setPenColor = (c: Color) => {
		setColorState(c);
		props.pen.color = c;
	};
	const colors: Color[] = ["black", "red", "blue", "green"];

	const [thicknessState, setThicknessState] = useState<Thickness>("md");
	const setPenThickness = (t: Thickness) => {
		setThicknessState(t);
		props.pen.thickness = t;
	};
	const thicknesses: Thickness[] = ["sm", "md", "lg"];

	return (
		<>
			{thicknesses.map((thickness, i) => {
				return (
					<button key={i} onClick={() => setPenThickness(thickness)}>
						<Icon
							className={cn(
								thicknessState === thickness ? "border-b-2" : "border-b-0",
								ThicknessValues[thickness].className,
							)}
							variant="pen"
							size="1.4em"
							color="black"
							hoverable
						/>
					</button>
				);
			})}

			{colors.map((color, i) => {
				return (
					<button onClick={() => setPenColor(color)} key={i}>
						<Icon
							className={colorState === color ? "border-b-2" : "border-b-0"}
							variant="square"
							size="1.4em"
							color={color}
							hoverable
						/>
					</button>
				);
			})}
		</>
	);
}
