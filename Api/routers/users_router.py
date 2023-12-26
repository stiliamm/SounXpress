from fastapi import APIRouter, File, Header, Body, Query, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
from utils.auth import authenticate
from services import users_service
from common.recorder import Recorder


users_router = APIRouter(prefix='/users')
recorder = Recorder()


@users_router.get('/info', tags=["Users"])
def get_user_info(x_token: str = Header()):
    return users_service.info(authenticate(x_token))


@users_router.get('/image', tags=["Users"])
def get_user_avatar(x_token: str = Header()):
    user = authenticate(x_token)
    file_path = users_service.get_avatar(user)
    if not file_path:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='File not found')
    return FileResponse(file_path)


@users_router.post('/upload_image', tags=["Users"])
def upload_profile_image(my_image: UploadFile = File(...), x_token: str = Header()):
    user = authenticate(x_token)
    return users_service.create_upload_avatar(my_image, user)


@users_router.post('/recordings/start', tags=["Users"])
def start_record(x_token: str = Header()):
    authenticate(x_token)
    recorder.start_recording()
    return {'message': 'Recording...'}


@users_router.post('/recordings/stop', tags=["Users"])
def stop_record(x_token: str = Header()):
    authenticate(x_token)
    recorder.stop_recording()
    return {'message': 'Stopping record...'}


@users_router.post('/recordings/upload', tags=["Users"])
def upload_audio(file_name: str = Body(), x_token: str = Header()):
    user = authenticate(x_token)
    saved = users_service.upload_audio_file(user, file_name, recorder)
    if saved == True:
        return {'message': 'File uploaded to library'}
    else:
        raise HTTPException(
            status_code=status.HTTP_417_EXPECTATION_FAILED)


@users_router.post('/recordings/play', tags=["Users"])
def play_audio(x_token: str = Header()):
    authenticate(x_token)
    try:
        recorder.play_recording()
        return {'message': 'Playing...'}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.__str__())


@users_router.get('/recordings', tags=["Users"])
def get_records(x_token: str = Header()):
    authenticate(x_token)
    try:
        return users_service.get_audio_files()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.__str__())


@users_router.get('/recordings/play_from_dir', tags=["Users"])
def play_audio_from_dir(username: str = Query(default=""),
                        file_name: str = Query(default=""),
                        x_token: str = Header()):
    authenticate(x_token)
    try:
        return users_service.play_from_dir(username, file_name)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.__str__())
