from fastapi import APIRouter, File, Header, Body, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
from utils.auth import authenticate
from services.users_service import info, create_upload_avatar, get_avatar, upload_audio_file
from common.recorder import Recorder


users_router = APIRouter(prefix='/users')
recorder = Recorder()


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


@users_router.post('/recordings/start')
def start_record(x_token: str = Header()):
    authenticate(x_token)
    recorder.start_recording()
    return {'message': 'Recording...'}


@users_router.post('/recordings/stop')
def stop_record(x_token: str = Header()):
    authenticate(x_token)
    recorder.stop_recording()
    return {'message': 'Stopping record...'}


@users_router.post('/recordings/upload')
def upload_audio(file_name: str = Body(), x_token: str = Header()):
    user = authenticate(x_token)
    saved = upload_audio_file(user, file_name, recorder)
    if saved == True:
        return {'message': 'File uploaded to library'}
    else:
        raise HTTPException(
            status_code=status.HTTP_417_EXPECTATION_FAILED)


@users_router.post('/recordings/play')
def play_audio(x_token: str = Header()):
    authenticate(x_token)
    try:
        recorder.play_recording()
        return {'message': 'Playing...'}
    except Exception as e:
        return e.__str__()


@users_router.get('/recordings')
def get_records(x_token: str = Header()):
    user = authenticate(x_token)
