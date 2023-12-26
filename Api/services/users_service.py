from common.database.db_connect import read_query
from common.models.user import User
from common.models.audio_file import AudioFile
from fastapi import UploadFile, HTTPException, status
from fastapi.responses import StreamingResponse
from PIL import Image
from pathlib import Path
from common.recorder import Recorder
import os


def info(user: User):
    records = read_query(
        '''SELECT file_name FROM recordings
           WHERE user_id = %s''', (user.id,)
    )

    return {
        "username": user.username,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "recordings": records
    }


def create_upload_avatar(myimage: UploadFile, user: User):
    _IMAGE_DIR = "./static/avatars/"

    filename = myimage.filename
    extention = filename.split('.')[-1].lower()

    if extention not in ('png', 'jpg', 'jpeg'):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='File extention not allowed')
    token_name = user.username + "." + extention
    generated_name = _IMAGE_DIR + token_name
    file_content = myimage.file.read()
    try:
        with open(generated_name, "wb") as f:
            f.write(file_content)

        img = Image.open(generated_name)
        img = img.resize(size=(154, 154))
        img.save(generated_name)

        return 'Sucessfully uploaded image'
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unexpected error occured.")


def get_avatar(user: User):
    base_path = Path(f"./static/avatars/{user.username}")
    extensions = ('.png', '.jpg', '.jpeg')
    file_path = next(
        (base_path.with_suffix(ext) for ext in extensions if (
            base_path.with_suffix(ext)).is_file()), None)
    return file_path


def upload_audio_file(user: User, file_name: str, recorder: Recorder):
    try:
        recorder.save_recording(user.username, file_name)
        return True
    except Exception as e:
        raise e


def get_audio_files():
    recordings = []
    _FILES_DIR = './static/recordings/'
    try:
        files = os.listdir(_FILES_DIR)
        for i, file_name in enumerate(files):
            file = os.path.join(_FILES_DIR, file_name)

            if os.path.isfile(file):
                user, f_name = file_name.split('@')
                recordings.append((i, f_name, user))

        return (AudioFile.from_query_result(*row) for row in recordings)
    except Exception as e:
        raise e


def play_from_dir(username: str, file_name: str):
    _FILE = Path(f"./static/recordings/{username}@{file_name}.wav")

    if _FILE.exists():
        file_stream = _FILE.open("rb")
        return StreamingResponse(file_stream, media_type='audio/wav')
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='File not found!')
