from fastapi import WebSocket
from typing import List

# every whiteboard has its own connection manager instance
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    # need to model the board data, str as a placeholder for now
    async def broadcast_board_data(self, data: str = ""):
        NotImplementedError()
