from datetime import datetime

from pydantic import BaseModel
from pydantic_extra_types.color import Color

from .constants import Action


class Stroke(BaseModel):
    id: Action
    uname: str
    timestamp: datetime
    coordinates: list[tuple[int, int]]
    color: Color
    width: int
