from fastapi import APIRouter

messages_router = APIRouter(prefix='/messages')


@messages_router.get('')
def get_messages():
    pass
