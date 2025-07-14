from typing import List

from fastapi import WebSocket
from models.stroke import Stroke


# every whiteboard has its own connection manager instance
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    # need to model the board data, str as a placeholder for now
    async def broadcast_board_data(self, data: Stroke):
        for conn in self.active_connections:
            await conn.send_text(data.model_dump_json())
