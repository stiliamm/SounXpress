from common.database.db_connect import read_query, insert_query
from common.models.user import User
from common.models.message import Message

# TODO: SEE HOW TO SEND FILES OVER MESSAGES (REFACTOR SEND_MESSAGE)
# TODO: IMPLEMENT GET CONVOS


def send_message(sender: User, receiver: User, message: Message):
    insert_query(
        '''INSERT INTO messages(from_user, to_user, message, file_id)
           VALUES(%s, %s, %s, %s)''',
        (sender.id, receiver.id, message.message, message.file_id)
    )

    return {
        "content": message.message
    }


def get_contact(username: str):
    contact = read_query(
        '''SELECT id, username, first_name, last_name 
           FROM users WHERE username = %s''',
        (username,)
    )

    return next((User.from_query_result(*row) for row in contact), None)


def get_conversation():
    pass
