import redis
from models.stroke import Stroke

HOST = "localhost"
PORT = 6379

class StrokeStore:
    def __init__(self, hosturl: str = HOST, portno: int = PORT):
        self.client = redis.Redis(host=hosturl, port=portno, decode_responses=True)
    
    async def save_stroke(self, board_id: int, data: Stroke):
        await self.client.sadd(str(board_id), data.model_dump_json)
    
    async def delete_stroke(self, board_id: int, data: Stroke):
        await self.client.srem(str(board_id), data.model_dump_json)
    
    async def load_stroke_history(self, board_id: int):
        await self.client.smembers(str(board_id))
