from typing import Set
import redis
from models.stroke import Stroke
import os

HOST = os.getenv("REDIS_HOST", "localhost")
PORT = int(os.getenv("REDIS_PORT", 6379))


class StrokeStore:
    def __init__(self, hosturl: str = HOST, portno: int = PORT):
        self.client = redis.Redis(host=hosturl, port=portno)

    async def save_stroke(self, board_id: int, data: Stroke):
        self.client.sadd(str(board_id), data.model_dump_json())

    async def delete_stroke(self, board_id: int, data: Stroke):
        self.client.srem(str(board_id), data.model_dump_json())

    async def load_stroke_history(self, board_id: int):
        mems = self.client.smembers(str(board_id))
        assert isinstance(mems, Set)
        return {mem.decode("utf-8") for mem in mems}
