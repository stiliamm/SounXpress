from pydantic import BaseModel


class Message(BaseModel):
    id: int | None = None
    from_user: int | None = None
    to_user: int | None = None
    message: str
    file_id: int | None = None

    @classmethod
    def from_query_result(cls, id, from_user, to_user, message, file_id):
        return cls(
            id=id,
            from_user=from_user,
            to_user=to_user,
            message=message,
            file_id=file_id
        )
