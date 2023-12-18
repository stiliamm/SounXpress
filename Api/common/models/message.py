from pydantic import BaseModel
from datetime import datetime


class Message(BaseModel):
    message: str
    timestamp: datetime

    @classmethod
    def from_query_result(cls, message, timestamp):
        return cls(
            message=message,
            timestamp=timestamp
        )


class Contact(BaseModel):
    username: str

    @classmethod
    def from_query_result(cls, username):
        return cls(
            username=username
        )
