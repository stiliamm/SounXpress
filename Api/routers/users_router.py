from fastapi import APIRouter, File, Header, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
from utils.auth import authenticate
from services.users_service import info, create_upload_avatar, get_avatar
from pathlib import Path


users_router = APIRouter(prefix='/users')


@users_router.get('/info', tags=["Users"])
def get_user_info(x_token: str = Header()):
    return info(authenticate(x_token))


@users_router.get('/image', tags=["Users"])
def get_user_avatar(x_token: str = Header()):
    user = authenticate(x_token)
    file_path = get_avatar(user)
    if not file_path:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='File not found')
    return FileResponse(file_path)


@users_router.post('/upload_image', tags=["Users"])
def upload_profile_image(my_image: UploadFile = File(...), x_token: str = Header()):
    user = authenticate(x_token)
    return create_upload_avatar(my_image, user)
