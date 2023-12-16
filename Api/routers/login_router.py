from fastapi import APIRouter, HTTPException, status
from common.models.login import Login
from services.login_service import try_login
from utils.auth import create_access_token

login_router = APIRouter(prefix='/login')


@login_router.post('', tags=['Login'])
def login_user(login_data: Login):
    user = try_login(login_data.username, login_data.password)

    if user:
        token = create_access_token(user)
        return {"token": token}
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )