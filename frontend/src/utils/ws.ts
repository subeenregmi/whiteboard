import { Action } from "@/models/constants";
import type { DataHandler, DataHandlerMap } from "@/models/data";

export default class WhiteboardWS {
	private uri: string;
	private ws: WebSocket;
	private handlers: DataHandlerMap;

	public constructor() {
		this.uri = "ws://localhost:8000/ws/1";
		this.ws = new WebSocket(this.uri);
		this.handlers = {
			[Action.Stroke]: () => {},
			[Action.Erase]: () => {},
		};

		this.ws.onopen = () => {
			console.log("Websocket connected!");
		};

		this.ws.close = () => {
			console.log("Websocket closed!");
		};
	}

	public registerHandler(handler: DataHandler) {
		switch (handler.action) {
			case Action.Stroke:
				this.handlers[Action.Stroke] = handler.handler;
				break;
			case Action.Erase:
				this.handlers[Action.Erase] = handler.handler;
				break;
		}
	}
}
