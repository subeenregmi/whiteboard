from enum import Enum, IntEnum

type Position = tuple[int, int]


class Action(IntEnum):
    Stroke = 1
    Erase = 2


class LineCap(Enum):
    round = "round"
    butt = "butt"
    square = "square"
