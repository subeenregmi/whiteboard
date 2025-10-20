import { MIN_STROKE_WIDTH, MAX_STROKE_WIDTH } from "@/models/constants";
import { ChangeEventHandler } from "react";

export interface ToolbarProps {
    penColorChanger: ChangeEventHandler<HTMLInputElement>;
    penThicknessChanger: ChangeEventHandler<HTMLInputElement>;

    changeEraserSelected: ChangeEventHandler<HTMLInputElement>;
    eraserSelected: boolean;
}

export default function Toolbar(props: ToolbarProps) {
    return (
        <div className="h-12">
            <input type="color" onChange={props.penColorChanger} />

            <input
                type="range"
                min={MIN_STROKE_WIDTH}
                max={MAX_STROKE_WIDTH}
                onChange={props.penThicknessChanger}
            />

            <input
                type="checkbox"
                id="eraser"
                onChange={props.changeEraserSelected}
                checked={props.eraserSelected}
            />
            <label htmlFor="eraser">Eraser</label>
        </div>
    );
}
