from typing import Annotated, Literal
from pydantic import BaseModel, Field
from models.constants import Action
from models.stroke import Stroke
from models.erase import Erase


class StrokeData(BaseModel):
    Action: Literal[Action.Stroke]
    Data: Stroke


class EraseData(BaseModel):
    Action: Literal[Action.Erase]
    Data: Erase


type Data = Annotated[StrokeData | EraseData, Field(discriminator="Action")]
