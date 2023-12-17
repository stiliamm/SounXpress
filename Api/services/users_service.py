from common.database.db_connect import read_query
from common.models.user import User
from fastapi import UploadFile, HTTPException, status
from PIL import Image
from pathlib import Path


def info(user: User):
    data = read_query(
        '''SELECT file_name FROM recordings
           WHERE user_id = %s''', (user.id,)
    )

    return {
        "username": user.username,
        "recordings": data
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
        img = img.resize(size=(160, 160))
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
