import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function Canvas() {
    useEffect (() => {
        const canvas = document.getElementById("whiteboard");
        const context = canvas.getContext("2d");
        let xcor = 0;
        let ycor = 0;
        const penWidth = 3;
        let painting = false;

        function updatePos(event) {
            xcor = event.clientX;
            ycor = event.clientY;
        }

        function setPainting(event) {
            updatePos(event);
            painting = true;
        }

        function unsetPainting() {
            painting = false
        }

        function draw(event) {
            if (painting) {
                context.lineWidth = penWidth;
                context.moveTo(xcor, ycor);
                updatePos(event);
                context.lineTo(xcor, ycor);
                context.stroke();
            }

        }

        document.addEventListener("mousedown", setPainting);
        document.addEventListener("mouseup", unsetPainting);
        document.addEventListener("mousemove", draw);

    });

    return (
        // canvas width and height is the entire window for now, will consider
        // tool bar later
        <canvas id="whiteboard" width={window.innerWidth} height={window.innerHeight}>
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
