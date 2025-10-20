import { MIN_STROKE_WIDTH, MAX_STROKE_WIDTH } from "@/models/constants";
import { ChangeEventHandler } from "react";

export interface ToolbarProps {
    penColorChanger: ChangeEventHandler;
    penThicknessChanger: ChangeEventHandler;
}

export default function Toolbar(props: ToolbarProps) {
    return (
        <div className="h-12">
            <input type="color" onChange={props.penColorChanger}></input>

            <input
                type="range"
                min={MIN_STROKE_WIDTH}
                max={MAX_STROKE_WIDTH}
                onChange={props.penThicknessChanger}
            ></input>
        </div>
    );
}
