"use client";

import { useEffect, useRef } from "react";
import WhiteboardWS from "@/utils/ws";
import { Stroke } from "@/models/stroke";
import {
    DEFAULT_COLOR,
    DEFAULT_STYLE,
    DEFAULT_THICKNESS,
    Position,
    SCALE_FACTOR,
} from "@/models/constants";
import { Pen } from "@/models/pen";
import Toolbar from "./toolbar";

const ws = new WhiteboardWS();

export default function Whiteboard() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D>(null);

    let currentPosition: Position = [0, 0];

    let painting = false;

    const pen: Pen = {
        color: DEFAULT_COLOR,
        thickness: DEFAULT_THICKNESS,
        style: DEFAULT_STYLE,
    };

    const currentStroke: Stroke = {
        id: Date.now(),
        uname: "test",
        coordinates: [],
        pen: pen,
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        canvas!.height = window.innerHeight * SCALE_FACTOR;
        canvas!.width = window.innerWidth * SCALE_FACTOR;
        canvas!.style.height = `${window.innerHeight}px`;
        canvas!.style.width = `${window.innerWidth}px`;

        context!.strokeStyle = pen.color;
        context!.lineWidth = pen.thickness;
        context!.lineCap = pen.style;

        contextRef.current = context!;

        ws.handleIncomingStroke(contextRef);
    }, [pen.color, pen.thickness, pen.style]);

    function updatePos(event: React.MouseEvent) {
        const x = event.clientX * SCALE_FACTOR;

        // hack to handle the displacement the top toolbar causes
        const y = event.clientY * SCALE_FACTOR - 48;
        currentPosition = [x, y];
    }

    function startPainting(event: React.MouseEvent) {
        updatePos(event);
        painting = true;
    }

    function stopPainting() {
        currentStroke.timestamp = Date.now();

        ws.sendStroke(currentStroke);

        currentStroke.coordinates = [];

        painting = false;
    }

    function draw(event: React.MouseEvent) {
        if (painting) {
            const x = event.clientX * SCALE_FACTOR;

            // hack to handle the displacement the top toolbar causes
            const y = event.clientY * SCALE_FACTOR - 48;

            contextRef.current!.strokeStyle = pen.color;
            contextRef.current!.lineWidth = pen.thickness;

            currentStroke.coordinates.push([x, y]);

            contextRef.current?.beginPath();
            contextRef.current?.moveTo(currentPosition[0], currentPosition[1]);
            contextRef.current?.lineTo(x, y);
            contextRef.current?.stroke();
            updatePos(event);
        }
    }

    function changePenColor(event: React.ChangeEvent<HTMLInputElement>) {
        pen.color = event.target.value;
    }

    function changePenThickness(event: React.ChangeEvent<HTMLInputElement>) {
        pen.thickness = Number(event.target.value);
    }

    return (
        <>
            <Toolbar
                penColorChanger={changePenColor}
                penThicknessChanger={changePenThickness}
            />
            <canvas
                ref={canvasRef}
                className="bg-white"
                onMouseDown={startPainting}
                onMouseUp={stopPainting}
                onMouseMove={draw}
            ></canvas>
        </>
    );
}
