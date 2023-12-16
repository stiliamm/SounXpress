import jwt
import os
from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from common.models.user import User
from datetime import datetime, timedelta
from services.login_service import get_user
SECRET_KEY = os.getenv('JWT_SECRET')
ALGORITHM = os.getenv('HASH_ALGORITHM')

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="x-token")


def create_access_token(user: User):
    to_encode = {
        "id": user.id,
        "username": user.username,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "issued": str(datetime.now())
    }
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def authenticate(token: str):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    expired_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Expired access token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload["username"]
        expiration = datetime.strptime(
            payload["issued"], '%Y-%m-%d %H:%M:%S.%f')
        if username is None:
            raise credentials_exception
        if expiration < datetime.now() - timedelta(minutes=30):
            raise expired_exception
    except Exception:
        raise credentials_exception
    user = get_user(username)[-1]
    if user is None:
        raise credentials_exception
    return user
