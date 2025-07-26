from models.constants import LineCap
from pydantic import BaseModel
from pydantic_extra_types.color import Color


class Pen(BaseModel):
    color: Color
    thickness: int
    style: LineCap
