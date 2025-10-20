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

    const [strokes, setStrokes] = useState<Stroke[]>([]);

    const [pen, setPen] = useState<Pen>({
        color: DEFAULT_COLOR,
        thickness: DEFAULT_THICKNESS,
        style: DEFAULT_STYLE,
    });

    const [eraserSelected, setEraserSelected] = useState<boolean>(false);

    const currentPosition = useRef<Position>([0, 0]);

    const mouseDown = useRef<boolean>(false);

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
        const canvas = canvasRef.current;

        context!.clearRect(0, 0, canvas!.width, canvas!.height);

        for (const stroke of strokes) {
            context!.strokeStyle = stroke.highlighted
                ? "rgba(0, 0, 0, 0.2)"
                : stroke.pen.color;
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
            console.log("Stroked!");
            context?.stroke();
        }
    }, [strokes]);

    function updatePos(event: React.MouseEvent) {
        const x = event.clientX * SCALE_FACTOR;

        // hack to handle the displacement the top toolbar causes
        const y = event.clientY * SCALE_FACTOR - 48;
        currentPosition.current = [x, y];
    }

    function stopPainting() {
        const finishedStroke: Stroke = {
            ...currentStroke,
            pen: { ...currentStroke.pen },
            timestamp: Date.now(),
        };
        ws.sendStroke(finishedStroke);
        setStrokes([...strokes, finishedStroke]);

        currentStroke.coordinates = [];
    }

    function stopErasing() {
        const deletedStrokes = strokes.filter((s: Stroke) => s.highlighted);
        setStrokes(deletedStrokes);
    }

    function handleDraw(event: React.MouseEvent) {
        const x = event.clientX * SCALE_FACTOR;

        // hack to handle the displacement the top toolbar causes
        const y = event.clientY * SCALE_FACTOR - 48;

        contextRef.current!.strokeStyle = pen.color;
        contextRef.current!.lineWidth = pen.thickness;

        currentStroke.coordinates.push([x, y]);

        contextRef.current?.beginPath();
        contextRef.current?.moveTo(
            currentPosition.current[0],
            currentPosition.current[1],
        );
        contextRef.current?.lineTo(x, y);
        contextRef.current?.stroke();
        updatePos(event);
    }

    function handleErasing(event: React.MouseEvent) {
        const x = event.clientX * SCALE_FACTOR;

        // hack to handle the displacement the top toolbar causes
        const y = event.clientY * SCALE_FACTOR - 48;

        const newStrokes: Stroke[] = [];

        let changed = false;

        console.log("Strokes", strokes);
        for (let i = 0; i < strokes.length; i++) {
            let smallestDist = 99999;
            for (const coord of strokes[i].coordinates) {
                const dist = Math.sqrt(
                    Math.pow(coord[0] - x, 2) + Math.pow(coord[1] - y, 2),
                );
                if (dist < smallestDist) smallestDist = dist;

                if (
                    dist < 10 + strokes[i].pen.thickness / 2 &&
                    !strokes[i].highlighted
                ) {
                    changed = true;
                    console.log("matched");
                    strokes[i].highlighted = true;
                }
            }
            //console.log("smallestDist", smallestDist);
            newStrokes.push(strokes[i]);
        }

        if (changed) setStrokes(newStrokes);
    }

    function handleMouseDown(event: React.MouseEvent) {
        // console.log("Mouse down!");
        updatePos(event);
        mouseDown.current = true;
    }

    function handleMouseUp() {
        // console.log("Mouse up!");

        mouseDown.current = false;
        if (eraserSelected) {
            stopErasing();
        } else {
            stopPainting();
        }
    }

    function handleMouseMovement(event: React.MouseEvent) {
        // console.log("Moving mouse!");
        if (!mouseDown.current) return;

        if (eraserSelected) {
            handleErasing(event);
        } else {
            handleDraw(event);
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
                eraserSelected={eraserSelected}
                changeEraserSelected={changeEraserSelected}
            />
            <canvas
                ref={canvasRef}
                className="bg-white"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMovement}
                style={{
                    cursor: eraserSelected
                        ? `url("/eraser.svg"), default`
                        : "default",
                }}
            ></canvas>
        </>
    );
}
