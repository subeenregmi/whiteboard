from pydantic import BaseModel

from models.constants import Position
from models.pen import Pen


class Stroke(BaseModel):
    id: str
    coordinates: list[Position]
    pen: Pen
