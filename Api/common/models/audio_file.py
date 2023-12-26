from pydantic import BaseModel


class AudioFile(BaseModel):
    id: int
    file_name: str
    username: str

    @classmethod
    def from_query_result(cls, id, file_name, username):
        return cls(
            id=id,
            file_name=file_name,
            username=username
        )
