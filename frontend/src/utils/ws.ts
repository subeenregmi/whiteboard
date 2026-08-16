import { Action } from "@/models/constants";
import type { Data, DataHandler, DataHandlerMap } from "@/models/data";

const UNIMPLEMENTED_HANDLER = () =>
	console.log("handler has not been implemented!");

export default class WhiteboardWS {
	private uri: string;
	private ws: WebSocket;
	private handlers: DataHandlerMap;

	public constructor() {
		// TODO: move to env var
		this.uri = "ws://localhost:8000/ws/1";
		this.ws = new WebSocket(this.uri);
		this.handlers = {
			[Action.Stroke]: UNIMPLEMENTED_HANDLER,
			[Action.Erase]: UNIMPLEMENTED_HANDLER,
			[Action.HandMove]: UNIMPLEMENTED_HANDLER,
		};

		this.ws.onopen = () => {
			console.log("Websocket connected!");
		};

		this.ws.onclose = () => {
			console.log("Websocket closed!");
		};

		this.ws.onmessage = (ev) => this.handleIncomingData(ev);
	}

	public registerHandler(handler: DataHandler) {
		switch (handler.action) {
			case Action.Stroke:
				this.handlers[Action.Stroke] = handler.handler;
				break;
			case Action.Erase:
				this.handlers[Action.Erase] = handler.handler;
				break;
			case Action.HandMove:
				this.handlers[Action.HandMove] = handler.handler;
				break;
		}
	}

	public sendData(data: Data) {
		console.log("Sending data", data);
		this.ws.send(JSON.stringify(data));
	}

	public handleIncomingData(ev: MessageEvent) {
		let data: Data;
		console.log("got new data");
		try {
			data = JSON.parse(ev.data);
		} catch {
			console.error("failed to parse incoming ws data:", ev.data);
			return;
		}

		switch (data.action) {
			case Action.Stroke:
				this.handlers[Action.Stroke](data.data);
				break;
			case Action.Erase:
				this.handlers[Action.Erase](data.data);
				break;
			case Action.HandMove:
				this.handlers[Action.HandMove](data.data);
				break;
		}
	}
}
