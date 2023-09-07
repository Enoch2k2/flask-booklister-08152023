from flask import request, session
from flask_restful import Resource
from sqlalchemy_serializer import SerializerMixin
from config import db, api
from models.models import User
from sqlalchemy.exc import IntegrityError


class CheckSession(Resource, SerializerMixin):
    def get(self):
        # grab the current user if session user_id exist
        id = session.get("user_id")
        if id:
            user = User.query.filter_by(id=id).first()
            return user.to_dict(), 200
        # return the current user if it exist
        return {}, 204
        # otherwise return an empty response


class Signup(Resource, SerializerMixin):
    def post(self):
        # grab the form data (json)
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        # instantiate a new user object
        try:
            user = User(username=username)
            user.password_hash = password
            # store user in the database
            db.session.add(user)
            db.session.commit()
            # encrypt the user password
            # **IMPORTANT** set the session to the user id
            session["user_id"] = user.id
            # return the user dictionary with a status of created
            return user.to_dict(), 201
        except IntegrityError:
            return {'error': 'Username must be unique'}, 422
        except ValueError as err:
            return {'error': str(err)}, 422


class Logout(Resource, SerializerMixin):
    def delete(self):
        if session.get("user_id"):
            del session["user_id"]
            return {'message': 'You are not logged in'}, 200
        else:
            return {'error': 'You are already logged out'}, 401


class Login(Resource, SerializerMixin):
    def post(self):
        # we want to get the json data
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        # we want to first check if an account exist by that username
        user = User.query.filter_by(username=username).first()
        # check if the user's password matches the user account
        if user and user.authenticate(password):
            # login user if yes
            session["user_id"] = user.id
            # return user dictionary
            return user.to_dict(), 200
            # otherwise return an error saying Username and password doesn't match
        else:
            return {'error': "Username or Password didn't match."}, 422


api.add_resource(Signup, '/api/signup')
api.add_resource(Logout, '/api/logout')
api.add_resource(Login, '/api/login')
api.add_resource(CheckSession, '/api/check_session')
