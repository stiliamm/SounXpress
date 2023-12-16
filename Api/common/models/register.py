from pydantic import BaseModel, StringConstraints, field_validator
from typing import Annotated


Allowed_Username = Annotated[str, StringConstraints(pattern=r'^\w{2,20}$')]
Allowed_Password = Annotated[str, StringConstraints(min_length=8, max_length=30)]


class Register(BaseModel):
    username: Allowed_Username
    first_name: str
    last_name: str
    password: Allowed_Password

    @field_validator('password', mode='before')
    @classmethod
    def validate_password(cls, value):
        if (
                any(c.islower() for c in value) and
                any(c.isupper() for c in value) and
                any(c.isdigit() for c in value) and
                any(c in "@$!%*?&" for c in value)
        ):
            return value
        raise ValueError(
            "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)."
        )