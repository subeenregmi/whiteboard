from typing import Dict

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from models.stroke import Stroke
from pydantic import ValidationError
from ws.ws import ConnectionManager
from rs.rs import StrokeStore
import json

app = FastAPI()
managers: Dict[int, ConnectionManager] = {}
stroke_store = StrokeStore()

# could use query parameters to implement password to join boards
@app.websocket("/ws/{board_id}")
async def websocket_endpoint(websocket: WebSocket, board_id: int):
    if board_id not in managers:
        managers[board_id] = ConnectionManager()

    manager = managers[board_id]
    await manager.connect(websocket)

    # to load in all previous strokes
    strokes = await stroke_store.load_stroke_history(board_id)
    for stroke in strokes:
        s = Stroke.model_validate(json.loads(stroke))
        await websocket.send_text(s.model_dump_json())

    try:
        while True:
            data = await websocket.receive_json()
            try:
                stroke = Stroke.model_validate(data)
                await stroke_store.save_stroke(board_id, stroke)
                await manager.broadcast_board_data(stroke)

            except ValidationError as e:
                print(e)
                await websocket.send_text("Invalid format")

    except WebSocketDisconnect:
        manager.disconnect(websocket)


@app.get("/")
async def root():
    return {"message": "Hello World"}
