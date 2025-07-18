from datetime import datetime

from models.constants import Action, Position
from models.pen import Pen
from pydantic import BaseModel


class Stroke(BaseModel):
    action: Action = Action.Stroke
    uname: str
    timestamp: datetime
    coordinates: list[Position]
    pen: Pen
