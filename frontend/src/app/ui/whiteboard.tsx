'use client';

import { useEffect, useState, useRef } from "react";

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

export default function Whiteboard() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D>(null);
    const [painting, setPainting] = useState<boolean>(false);
    const coordinates = useRef<number[]>([1, 0]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        canvas!.height = window.innerHeight;
        canvas!.width = window.innerWidth;

        context!.strokeStyle = penStyle.strokeStyle;
        context!.lineWidth = penStyle.lineWidth;
        context!.lineCap = penStyle.lineCap;
        

        contextRef.current = context!;

    }, [canvasRef, contextRef, penStyle]);

    function updatePos(event: React.MouseEvent) {
        coordinates.current = [event.clientX, event.clientY]
    }

    function startPainting(event: React.MouseEvent) {
        updatePos(event);
        setPainting(true)
    }

    function stopPainting(event: React.MouseEvent) {
        setPainting(false)
    }

    function draw(event: React.MouseEvent) {
        if (painting) {
            const x = event.clientX;
            const y = event.clientY;

            contextRef.current?.beginPath()
            contextRef.current?.moveTo(coordinates.current[0], coordinates.current[1])
            contextRef.current?.lineTo(x, y);
            contextRef.current?.stroke();
            console.log(contextRef.current?.lineWidth)
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
