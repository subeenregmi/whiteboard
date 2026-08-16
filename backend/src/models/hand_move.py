from pydantic import BaseModel

from models.constants import Position


class HandMove(BaseModel):
    id: str
    position: Position
