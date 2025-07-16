from pydantic import BaseModel
from pydantic_extra_types.color import Color


class Cursor(BaseModel):
    uid: int
    x: int
    y: int
    color: Color
