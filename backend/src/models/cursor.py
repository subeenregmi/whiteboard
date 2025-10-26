from pydantic import BaseModel

from models.constants import Action, Position


class Cursor(BaseModel):
    Position: Position
    CurrentAction: Action
