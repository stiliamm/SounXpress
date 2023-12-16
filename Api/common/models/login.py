from pydantic import BaseModel, StringConstraints
from typing import Annotated


Allowed_Username = Annotated[str, StringConstraints(pattern=r'^\w{2,20}$')]
Allowed_Password = Annotated[str,
                             StringConstraints(min_length=8, max_length=30)]


class Login(BaseModel):
    username: Allowed_Username
    password: Allowed_Password
