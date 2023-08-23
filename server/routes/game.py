from flask_restful import Resource
from config import api
from models.models import Game


class GamesResource(Resource):
    def get(self):
        games = [game.to_dict() for game in Game.query.all()]
        return games, 200


api.add_resource(GamesResource, "/api/games")

# GET /games would give back all of the games, index (READ)
# POST /games would create one game, CREATE

# GET /games/<int:id> gives us one game READ
# PATCH /games/<int:id> updating a game
# DELETE /games/<int:id> destroying a game
