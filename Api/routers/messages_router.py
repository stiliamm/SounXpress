from fastapi import APIRouter, Header, HTTPException, status, Body
from utils.auth import authenticate
from services.messages_service import send_message, get_contact, conversation, contacts

messages_router = APIRouter(prefix='/messages')


@messages_router.post('/{contact_username}')
def send(contact_username: str, message: str = Body(), x_token: str = Header()):
    user = authenticate(x_token)
    receiver = get_contact(contact_username)
    if not receiver:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='User not found!')
    return send_message(user, receiver, message)


@messages_router.get('/{contact_username}')
def get_conversation(contact_username: str, x_token: str = Header()):
    user = authenticate(x_token)
    contact = get_contact(contact_username)
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='User not found!')
    return conversation(user, contact)


@messages_router.get('')
def get_contacts(x_token: str = Header()):
    user = authenticate(x_token)
    return contacts(user)
