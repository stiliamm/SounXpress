from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from common.models.register import Register
from services.register_service import create_user, user_exists


regitser_router = APIRouter(prefix='/register')


@regitser_router.post('', tags=['Register'])
def register(register_data: Register):
    if user_exists(register_data.username):
        return JSONResponse(
            status_code=status.HTTP_403_FORBIDDEN, 
            content='Username is taken')
    return create_user(register_data, register_data.password)