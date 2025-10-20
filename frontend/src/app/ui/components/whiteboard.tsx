"use client";

import { useEffect, useRef, useState } from "react";
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

    const [strokes, setStrokes] = useState<Stroke[]>([]);

    const [pen, setPen] = useState<Pen>({
        color: DEFAULT_COLOR,
        thickness: DEFAULT_THICKNESS,
        style: DEFAULT_STYLE,
    });

    const [isEraserSelected, setEraserSelected] = useState<boolean>(false);

    const currentStroke: Stroke = {
        id: Date.now(),
        uname: "test",
        coordinates: [],
        pen: pen,
    };

    // Initial rendering of whiteboard
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        canvas!.height = window.innerHeight * SCALE_FACTOR;
        canvas!.width = window.innerWidth * SCALE_FACTOR;
        canvas!.style.height = `${window.innerHeight}px`;
        canvas!.style.width = `${window.innerWidth}px`;

        context!.strokeStyle = DEFAULT_COLOR;
        context!.lineWidth = DEFAULT_THICKNESS;
        context!.lineCap = DEFAULT_STYLE;

        contextRef.current = context!;

        ws.handleIncomingStroke((s: Stroke) => {
            setStrokes((prev) => [...prev, s]);
        });
    }, []);

    // Re-draw entire whiteboard when strokes changes
    useEffect(() => {
        const context = contextRef.current;
        for (const stroke of strokes) {
            context!.strokeStyle = stroke.pen.color;
            context!.lineWidth = stroke.pen.thickness;

            context?.beginPath();

            const c = stroke.coordinates?.[0];

            if (stroke.coordinates.length == 0) {
                // Do nothing
            } else if (stroke.coordinates.length == 1) {
                context?.moveTo(c[0], c[1]);
                context?.fillRect(c[0], c[1], 1, 1);
            } else {
                const c = stroke.coordinates[0];
                context?.moveTo(c[0], c[1]);
                stroke.coordinates.forEach((x) => {
                    context?.lineTo(x[0], x[1]);
                });
            }
            context?.stroke();
        }
    }, [strokes]);

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
        setStrokes([...strokes, currentStroke]);

        console.log(strokes);

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
        setPen(pen);
    }

    function changePenThickness(event: React.ChangeEvent<HTMLInputElement>) {
        pen.thickness = Number(event.target.value);
        setPen(pen);
    }

    function changeEraserSelected(event: React.ChangeEvent<HTMLInputElement>) {
        setEraserSelected(event.target.checked);
    }

    return (
        <>
            <Toolbar
                penColorChanger={changePenColor}
                penThicknessChanger={changePenThickness}
                eraserSelected={isEraserSelected}
                changeEraserSelected={changeEraserSelected}
            />
            <canvas
                ref={canvasRef}
                className="bg-white"
                onMouseDown={startPainting}
                onMouseUp={stopPainting}
                onMouseMove={draw}
                style={{
                    cursor: isEraserSelected ? "url()" : "default",
                }}
            ></canvas>
        </>
    );
}
