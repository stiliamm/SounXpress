from pydantic import BaseModel


class User(BaseModel):
    id: int | None = None
    username: str
    first_name: str
    last_name: str
    photo: str | None = None

    @classmethod
    def from_query_result(cls, id, username, first_name, last_name, photo):
        return cls(
            id=id,
            username=username,
            first_name=first_name,
            last_name=last_name,
            photo=photo
        )