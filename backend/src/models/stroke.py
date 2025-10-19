from datetime import datetime

from pydantic import BaseModel
from pydantic_extra_types.color import Color


class Stroke(BaseModel):
    id: int
    uname: str
    timestamp: datetime
    coordinates: list[tuple[int, int]]
    color: Color
    width: int
