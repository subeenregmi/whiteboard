from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import Dict
from ws import ConnectionManager

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
            await manager.broadcast_board_data()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.get("/")
async def root():
    return {"message": "Hello World"}
