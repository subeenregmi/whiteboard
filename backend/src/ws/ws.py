from typing import List

from fastapi import WebSocket
from models.data import Data


import logging


# every whiteboard has its own connection manager instance
class ConnectionManager:
    def __init__(self, logger: logging.Logger):
        self.active_connections: List[WebSocket] = []
        self.logger = logger

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    # need to model the board data, str as a placeholder for now
    async def broadcast_data(self, senderWS: WebSocket, d: Data):
        for conn in self.active_connections:
            if conn == senderWS:
                continue
            await conn.send_text(d.model_dump_json())
