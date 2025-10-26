from typing import Annotated, Literal

from pydantic import BaseModel, Field

from models.constants import Action
from models.cursor import Cursor
from models.erase import Erase
from models.stroke import Stroke


class StrokeData(BaseModel):
    Action: Literal[Action.Stroke]
    Data: Stroke


class EraseData(BaseModel):
    Action: Literal[Action.Erase]
    Data: Erase


class CursorData(BaseModel):
    Action: Literal[Action.CursorMove]
    Data: Cursor


type Data = Annotated[
    StrokeData | EraseData | CursorData, Field(discriminator="Action")
]
