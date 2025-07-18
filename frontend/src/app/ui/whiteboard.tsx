'use client';

import { useEffect, useState, useRef, ChangeEvent } from "react";
import WhiteboardWS from '@/utils/ws';

interface PenStyle {
    strokeStyle: string;
    lineWidth: number;
    lineCap: CanvasLineCap;
};

const penStyle: PenStyle = {
    strokeStyle: "green",
    lineWidth: 10,
    lineCap: "round"
}

import { Stroke } from "@/utils/stroke";


const ws = new WhiteboardWS();

const SCALE_FACTOR: number = 2;
const MIN_STROKE_WIDTH: number = 1;
const MAX_STROKE_WIDTH: number = 100;

export default function Whiteboard() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D>(null);
    const [painting, setPainting] = useState<boolean>(false);
    const coordinates = useRef<number[]>([0, 0]);

    const [strokeColour, setStrokeColour] = useState<string>("green");
    const [strokeWidth, setStrokeWidth] = useState<number>(10);

    let currentStroke: Stroke = {
        id: Date.now(),
        uname: "Unknown",
        timestamp: Date.now(),
        coordinates: [],
        color: strokeColour,
        width: strokeWidth,
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        canvas!.height = window.innerHeight * SCALE_FACTOR;
        canvas!.width = window.innerWidth * SCALE_FACTOR;
        canvas!.style.height = `${window.innerHeight}px`;
        canvas!.style.width = `${window.innerWidth}px`;

        context!.strokeStyle = strokeColour;
        context!.lineWidth = strokeWidth;
        context!.lineCap = "round";
        
        contextRef.current = context!;

        ws.handleIncomingStroke(contextRef)

    }, [canvasRef, contextRef]);

    function updatePos(event: React.MouseEvent) {
        const x = event.clientX * SCALE_FACTOR;
        const y = event.clientY * SCALE_FACTOR;
        coordinates.current = [x, y]
    }

    function startPainting(event: React.MouseEvent) {
        updatePos(event);
        setPainting(true)
    }

    function stopPainting(event: React.MouseEvent) {
        ws.sendStroke(currentStroke);

        currentStroke = {
            id: 1,
            uname: "Unknown",
            timestamp: Date.now(),
            coordinates: [],
            color: strokeColour,
            width: strokeWidth,
        };

        setPainting(false)
    }

    function draw(event: React.MouseEvent) {
        
        if (painting) {
            const x = event.clientX * SCALE_FACTOR;
            const y = event.clientY * SCALE_FACTOR;
            
            contextRef.current!.strokeStyle = strokeColour;
            contextRef.current!.lineWidth = strokeWidth;

            currentStroke.coordinates.push([x, y]);

            contextRef.current?.beginPath()
            contextRef.current?.moveTo(coordinates.current[0], coordinates.current[1])
            contextRef.current?.lineTo(x, y);
            contextRef.current?.stroke();
            updatePos(event)
        }
    }

    function changeStrokeColour(event: React.ChangeEvent<HTMLInputElement>) {
        setStrokeColour(event.target.value);
    }

    function changeStrokeWidth(event: React.ChangeEvent<HTMLInputElement>) {
        setStrokeWidth(Number(event.target.value));
    }

    return (
        
        // added a simple toolbar at the top for testing
        <>
            <input
                type="color"
                value={strokeColour}
                onChange={changeStrokeColour}
            >
            </input>

            <input
                type="range"
                value={strokeWidth}
                min={MIN_STROKE_WIDTH}
                max={MAX_STROKE_WIDTH}
                onChange={changeStrokeWidth}
            >
            </input>

            <canvas 
                ref={canvasRef}
                className="bg-white"
                onMouseDown={startPainting}
                onMouseUp={stopPainting}
                onMouseMove={draw}
            >
            </canvas>
        </>
    );
}
