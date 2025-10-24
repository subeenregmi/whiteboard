from pydantic import BaseModel


class Erase(BaseModel):
    ids: list[int]
