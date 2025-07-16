from typing import Dict

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from models.stroke import Stroke
from pydantic import ValidationError
from ws.ws import ConnectionManager

app = FastAPI()

# mapping between the board_id and the manager for that board
managers: Dict[int, ConnectionManager] = {}


# could use query parameters to implement password to join boards
@app.websocket("/ws/{board_id}")
async def websocket_endpoint(websocket: WebSocket, board_id: int):
    # create new board if doesnt already exist
    if board_id not in managers:
        managers[board_id] = ConnectionManager()

    manager = managers[board_id]
    await manager.connect(websocket)

    try:
        while True:
            data = await websocket.receive_json()
            try:
                stroke = Stroke.model_validate(data)
                await manager.broadcast_board_data(stroke)

            except ValidationError as e:
                print(e)
                await websocket.send_text("Invalid format")

    except WebSocketDisconnect:
        manager.disconnect(websocket)


@app.get("/")
async def root():
    return {"message": "Hello World"}
