from flask_restful import Resource
from config import api
from models.models import User


class UsersResource(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200


class UserResource(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()

        return user.to_dict(), 200


api.add_resource(UsersResource, "/api/users")
api.add_resource(UserResource, "/api/users/<int:id>")

# GET /games would give back all of the games, index (READ)
# POST /games would create one game, CREATE

# GET /games/<int:id> gives us one game READ
# PATCH /games/<int:id> updating a game
# DELETE /games/<int:id> destroying a game
