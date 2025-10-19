from datetime import datetime
from models.constants import Position
from models.pen import Pen
from pydantic import BaseModel


class Stroke(BaseModel):
    id: int
    uname: str
    timestamp: datetime
    coordinates: list[Position]
    pen: Pen
