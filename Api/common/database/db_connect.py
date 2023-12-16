import mariadb
import os
from mariadb import connect
from mariadb.connections import Connection
from dotenv import load_dotenv
load_dotenv()
db_password = os.getenv('DB_PASSWORD')


def _get_connection() -> Connection:
    return connect(
        user='root',
        password=f'{db_password}',
        host='localhost',
        port=3306,
        database='recorder'
    )


def read_query(sql: str, sql_params=()):
    with _get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(sql, sql_params)

        return list(cursor)


def insert_query(sql: str, sql_params=()) -> int:
    with _get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(sql, sql_params)
        conn.commit()

        return cursor.lastrowid


def update_query(sql: str, sql_params=()) -> bool:
    with _get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(sql, sql_params)
        conn.commit()

        return cursor.rowcount


def update_query_transaction(sql_queries: tuple[str], sql_params: tuple[tuple]) -> bool:
    with _get_connection() as conn:
        try:
            cursor = conn.cursor()
            for i in range(len(sql_queries)):
                cursor.execute(sql_queries[i], sql_params[i])

            conn.commit()
            return True
        except mariadb.Error as error:
            print(f"Database update failed: {error}")
            conn.rollback()
            return False


def insert_query_transaction(sql_queries: tuple[str], sql_params: tuple[tuple]) -> int:
    with _get_connection() as conn:
        try:
            cursor = conn.cursor()
            for i in range(len(sql_queries)):
                cursor.execute(sql_queries[i], sql_params[i])

            conn.commit()
            return cursor.lastrowid
        except mariadb.Error as error:
            print(f"Database insertion failed: {error}")
            conn.rollback()
            return False


def read_query_transaction(sql_queries: tuple[str], sql_params: tuple[tuple]):
    with _get_connection() as conn:
        try:
            cursor = conn.cursor()
            data = []
            for i in range(len(sql_queries)):
                cursor.execute(sql_queries[i], sql_params[i])
                data.append(cursor)

            return data
        except mariadb.Error as error:
            print(f"Database read failed: {error}")
            conn.rollback()
            return False
