from fastapi import APIRouter

play_router = APIRouter(prefix='/play')


@play_router.put('')
def play_audio():
    pass