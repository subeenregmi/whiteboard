from models.constants import Action, Position
from pydantic import BaseModel


class MouseMove(BaseModel):
    action: Action = Action.MouseMove
    uname: str
    position: Position
