from fastapi import APIRouter, Header, HTTPException, status
from utils.auth import authenticate
from services.messages_service import send_message, get_contact
from common.models.message import Message

messages_router = APIRouter(prefix='/messages')


@messages_router.post('/{contact_username}')
def send(contact_username: str, message: Message, x_token: str = Header()):
    user = authenticate(x_token)
    receiver = get_contact(contact_username)
    if not receiver:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='User not found!')
    return send_message(user, receiver, message)
