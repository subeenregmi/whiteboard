import './App.css';
import { useEffect, useState, useRef } from 'react';

const penStyle = {
    strokeStyle: "black",
    lineWidth: 3,
    lineCap: "round"
};

function Canvas() {

    const canvasRef = useRef(null);
    const contextRef = useRef(null)
    const [painting, setPainting] = useState(false);
    const coordinates = useRef([0, 0]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.strokeStyle = penStyle.strokeStyle;
        context.lineWidth = penStyle.lineWidth;
        context.lineCap = penStyle.lineCap;
        
        contextRef.current = context;
    }, [canvasRef, contextRef]);


    function updatePos(event) {
        coordinates.current = [event.clientX, event.clientY]
    }

    function startPainting(event) {
        updatePos(event);
        setPainting(true)
    }

    function stopPainting(event) {
        setPainting(false)
    }

    function draw(event) {
        if (painting) {
            const x = event.clientX;
            const y = event.clientY;

            contextRef.current.beginPath()
            contextRef.current.moveTo(coordinates.current[0], coordinates.current[1])
            contextRef.current.lineTo(x, y);
            contextRef.current.stroke();
            updatePos(event)
        }
    }

    return (
        // canvas width and height is the entire window for now, will consider
        // tool bar later
        <canvas 
            ref={canvasRef}
            width={window.innerWidth} 
            height={window.innerHeight}
            onMouseDown={startPainting}
            onMouseUp={stopPainting}
            onMouseMove={draw}
        >
        </canvas>
    );
}

function App() {
  return (
    <div className="App">
        <Canvas />
    </div>
  );
}

export default App;