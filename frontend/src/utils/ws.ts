import { Dispatch, SetStateAction } from "react";
import { Stroke } from "../models/stroke";

export default class WhiteboardWS {
    private uri: string;
    private ws: WebSocket;

    public constructor() {
        this.uri = "ws://localhost:8000/ws/1";

        this.ws = new WebSocket(this.uri);

        this.ws.onopen = () => {
            console.log("Websocket connected!");
        };

        this.ws.close = () => {
            console.log("Websocket closed!");
        };
    }

    public handleIncomingStroke(addStroke: (s: Stroke) => void) {
        this.ws.onmessage = (event) => {
            const stroke: Stroke = JSON.parse(event.data);
            addStroke(stroke);
        };
    }

    public sendStroke(s: Stroke) {
        this.ws.send(JSON.stringify(s));
    }
}
