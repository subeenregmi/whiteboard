'use client';

import { useEffect, useState, useRef } from "react";
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

const ws = new WhiteboardWS();

const SCALE_FACTOR: number = 2;

export default function Whiteboard() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D>(null);
    const [painting, setPainting] = useState<boolean>(false);
    const coordinates = useRef<number[]>([0, 0]);
    let currentStroke: [number, number][] = [];

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        canvas!.height = window.innerHeight * SCALE_FACTOR;
        canvas!.width = window.innerWidth * SCALE_FACTOR;
        canvas!.style.height = `${window.innerHeight}px`;
        canvas!.style.width = `${window.innerWidth}px`;

        context!.strokeStyle = penStyle.strokeStyle;
        context!.lineWidth = penStyle.lineWidth;
        context!.lineCap = penStyle.lineCap;
        
        contextRef.current = context!;

        ws.handleIncomingStroke(contextRef)

    }, [canvasRef, contextRef, penStyle]);

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
        currentStroke = [];
        setPainting(false)
    }

    function draw(event: React.MouseEvent) {
        
        if (painting) {
            const x = event.clientX * SCALE_FACTOR;
            const y = event.clientY * SCALE_FACTOR;

            currentStroke.push([x, y]);

            contextRef.current?.beginPath()
            contextRef.current?.moveTo(coordinates.current[0], coordinates.current[1])
            contextRef.current?.lineTo(x, y);
            contextRef.current?.stroke();
            updatePos(event)
        }
    }

    return (
        // canvas width and height is the entire window for now, will consider
        // tool bar later
        <canvas 
            ref={canvasRef}
            className="bg-white"
            onMouseDown={startPainting}
            onMouseUp={stopPainting}
            onMouseMove={draw}
        >
        </canvas>
    );
}
