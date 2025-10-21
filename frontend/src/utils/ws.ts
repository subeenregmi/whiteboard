import { Stroke } from "../models/stroke";
import { Data, EraseData, StrokeData } from "@/models/data";
import { Erase } from "@/models/erase";
import { Action } from "@/models/constants";

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

    public handleIncomingData(
        addStroke: (s: Stroke) => void,
        eraseStrokes: (e: Erase) => void,
    ) {
        this.ws.onmessage = (event) => {
            const data: Data = JSON.parse(event.data);

            switch (data.Action) {
                case Action.Stroke:
                    addStroke(data.Data);
                    break;
                case Action.Erase:
                    eraseStrokes(data.Data);
                    break;
                default:
                    console.log("Unknown data action");
                    break;
            }
        };
    }

    public sendStroke(s: Stroke) {
        const data: StrokeData = {
            Action: Action.Stroke,
            Data: s,
        };

        this.ws.send(
            JSON.stringify(data, (key, value) => {
                if (key == "highlighted") {
                    return undefined;
                }

                return value;
            }),
        );
    }

    public sendErase(e: Erase) {
        const data: EraseData = {
            Action: Action.Erase,
            Data: e,
        };

        this.ws.send(JSON.stringify(data));
    }
}
