from pydantic import BaseModel
from datetime import datetime


class Message(BaseModel):
    id: int
    message: str
    timestamp: datetime
    from_user: str

    @classmethod
    def from_query_result(cls, id, message, timestamp, from_user):
        return cls(
            id=id,
            message=message,
            timestamp=timestamp,
            from_user=from_user
        )


class Contact(BaseModel):
    username: str

    @classmethod
    def from_query_result(cls, username):
        return cls(
            username=username
        )
