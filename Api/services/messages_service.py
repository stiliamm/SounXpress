from common.database.db_connect import read_query, insert_query
from common.models.user import User
from common.models.message import Message, Contact
from datetime import datetime

# TODO: SEE HOW TO SEND FILES OVER MESSAGES (REFACTOR SEND_MESSAGE)
# TODO: IMPLEMENT GET CONVOS


def send_message(sender: User, receiver: User, message: str):
    insert_query(
        '''INSERT INTO messages(from_user, to_user, message, timestamp)
           VALUES(%s, %s, %s, %s)''',
        (sender.id, receiver.id, message, datetime.now())
    )
    return {
        "content": message
    }


def get_contact(username: str):
    contact = read_query(
        '''SELECT id, username, first_name, last_name 
           FROM users WHERE username = %s''',
        (username,)
    )
    return next((User.from_query_result(*row) for row in contact), None)


def conversation(user: User, contact: User):
    messages = read_query(
        '''SELECT m.id, m.message, m.timestamp, u.username FROM messages m
           LEFT JOIN users u ON m.from_user = u.id
           WHERE (from_user = %s AND to_user = %s) OR (from_user = %s AND to_user = %s)
           ORDER BY timestamp''',
        (user.id, contact.id, contact.id, user.id)
    )
    return (Message.from_query_result(*msg) for msg in messages)


def contacts(user: User):
    data = read_query(
        '''SELECT DISTINCT u.username
           FROM users u
           JOIN messages m ON u.id = m.from_user OR u.id = m.to_user
           WHERE u.id <> %s AND (m.from_user = %s OR m.to_user = %s)''',
        (user.id, user.id, user.id)
    )
    return (Contact.from_query_result(*usrnm) for usrnm in data)


def all_users():
    data = read_query(
        '''SELECT username FROM users
           LIMIT 10'''
    )
    return (Contact.from_query_result(*user) for user in data)
