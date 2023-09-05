from flask import session


def login_authorization():
    return not not session.get("user_id")
