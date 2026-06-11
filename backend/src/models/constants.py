from enum import IntEnum

type Position = tuple[float, float]


class Action(IntEnum):
    Stroke = 1
    Erase = 2
