import logging
from typing import Dict

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import TypeAdapter, ValidationError

from models.constants import Action
from models.data import Data, StrokeData
from rs.rs import StrokeStore
from ws.ws import ConnectionManager

app = FastAPI(debug=True)
managers: Dict[int, ConnectionManager] = {}

logger = logging.getLogger(__name__)

stroke_store = StrokeStore(logger)

data_type_adapter: TypeAdapter[Data] = TypeAdapter(Data)


# could use query parameters to implement password to join boards
@app.websocket("/ws/{board_id}")
async def websocket_endpoint(websocket: WebSocket, board_id: int):
    if board_id not in managers:
        managers[board_id] = ConnectionManager(logger)

    manager = managers[board_id]
    await manager.connect(websocket)

    # to load in all previous strokes
    strokes = stroke_store.load_strokes(board_id)

    for stroke in strokes:
        data = StrokeData(Action=Action.Stroke, Data=stroke)
        await websocket.send_text(data.model_dump_json())

    try:
        while True:
            data = await websocket.receive_json()
            try:
                validated_data = data_type_adapter.validate_python(data)

                match validated_data.Action:
                    case Action.Stroke:
                        stroke_store.save_stroke(board_id, validated_data.Data)
                        await manager.broadcast_data(websocket, validated_data)

                    case Action.Erase:
                        stroke_store.erase_strokes(board_id, validated_data.Data)
                        await manager.broadcast_data(websocket, validated_data)

                    case Action.CursorMove:
                        await manager.broadcast_data(websocket, validated_data)

            except ValidationError as e:
                print(e)
                await websocket.send_text("Invalid format")

    except WebSocketDisconnect:
        manager.disconnect(websocket)


@app.get("/")
async def root():
    return {"message": "Hello World"}
