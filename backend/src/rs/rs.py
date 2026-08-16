import json
import os
from logging import Logger

import redis
from pydantic import ValidationError

from models.erase import Erase
from models.stroke import Stroke

HOST = os.getenv("REDIS_HOST", "localhost")
PORT = int(os.getenv("REDIS_PORT", "6379"))


class StrokeStore:
    def __init__(self, logger: Logger, hosturl: str = HOST, portno: int = PORT):
        self.client = redis.Redis(host=hosturl, port=portno)
        self.logger = logger

    def save_stroke(self, board_id: int, data: Stroke):
        self.client.sadd(str(board_id), data.model_dump_json())

    def erase_strokes(self, board_id: int, e: Erase):
        strokes = self.load_strokes(board_id)
        deleted_strokes = [stroke for stroke in strokes if stroke.id in e.ids]

        for stroke in deleted_strokes:
            self.client.srem(str(board_id), stroke.model_dump_json())

    def load_strokes(self, board_id: int) -> list[Stroke]:
        mems = self.client.smembers(str(board_id))
        assert isinstance(mems, set)

        strokes = {mem.decode("utf-8") for mem in mems}

        sorted_strokes: list[Stroke] = []

        for stroke in strokes:
            try:
                s = Stroke.model_validate(json.loads(stroke))
                sorted_strokes.append(s)
            except ValidationError as e:
                self.logger.error(e)

        return sorted_strokes
