import { Stroke } from "./stroke";

export default class WhiteboardWS {
    private uri: string;
    private ws: WebSocket;

    public constructor() {
        this.uri = "ws://localhost:8000/ws/1";

        this.ws = new WebSocket(this.uri);

        this.ws.onopen = () => {
            console.log("Websocket connected!");
        }

        this.ws.close = () => {
            console.log("Websocket closed!");
        }

    }

    public handleIncomingStroke(contextRef: React.RefObject<CanvasRenderingContext2D | null>) { 
        this.ws.onmessage = (event) => {
            const stroke: Stroke = JSON.parse(event.data)
            const context = contextRef.current;

            context!.strokeStyle = stroke.color;
            context!.lineWidth = stroke.width;

            context?.beginPath();

            const c = stroke.coordinates?.[0]

            if (stroke.coordinates.length == 0) {
                // Do nothing
            }
            else if (stroke.coordinates.length == 1) {
                context?.moveTo(c[0], c[1])
                context?.fillRect(c[0], c[1], 1, 1)
            } else {
                const c = stroke.coordinates[0];
                context?.moveTo(c[0], c[1])
                stroke.coordinates.forEach((x) => {
                    context?.lineTo(x[0], x[1]);
                })
            }
            context?.stroke();
        }
    }

    public sendStroke(s: Stroke) {
        this.ws.send(JSON.stringify(s));
    }
}