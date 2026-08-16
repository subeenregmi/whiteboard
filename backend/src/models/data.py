from typing import Annotated, Literal

from pydantic import BaseModel, Field

from models.constants import Action
from models.erase import Erase
from models.hand_move import HandMove
from models.stroke import Stroke


class StrokeData(BaseModel):
    action: Literal[Action.Stroke]
    data: Stroke


class EraseData(BaseModel):
    action: Literal[Action.Erase]
    data: Erase


class HandMoveData(BaseModel):
    action: Literal[Action.HandMove]
    data: HandMove


type Data = Annotated[
    StrokeData | EraseData | HandMoveData, Field(discriminator="action")
]
