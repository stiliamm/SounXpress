from common.database.db_connect import read_query
from common.models.user import User
from hashlib import sha256
from hmac import compare_digest



def try_login(username: str, password: str):
    u_password, user = get_user(username)
    if not user: return None
    password_check = _hash_password(password)
    return user if compare_digest(u_password, password_check) else None


def get_user(username: str):
    data = read_query(
        '''SELECT id, username, first_name, last_name, avatar, password
           FROM users WHERE username = %s''',
        (username,)
    )
    if data:
        password_bytes = bytes(data[0][-1])
        password_string = password_bytes.decode('utf-8')
        return password_string, next(
            (User.from_query_result(*row[:-1]) for row in data), None)
    else:
        return None, None
    

def _hash_password(text: str):
    return sha256(text.encode('utf-8')).hexdigest()