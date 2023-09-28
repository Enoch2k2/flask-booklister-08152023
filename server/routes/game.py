from flask import request
from flask_restful import Resource
from config import api, db
from models.models import Game


class GamesResource(Resource):
    def get(self):
        games = [game.to_dict() for game in Game.query.all()]
        return games, 200

    def post(self):
        data = request.get_json()
        title = data.get("title")
        description = data.get("description")
        image_url = data.get("image_url")

        try:
            game = Game(title=title, description=description,
                        image_url=image_url)

            db.session.add(game)
            db.session.commit()
            return game.to_dict(), 201
        except ValueError as err:
            return {"error": str(err)}, 422


api.add_resource(GamesResource, "/api/games")

# GET /games would give back all of the games, index (READ)
# POST /games would create one game, CREATE

# GET /games/<int:id> gives us one game READ
# PATCH /games/<int:id> updating a game
# DELETE /games/<int:id> destroying a game


# create a route that returns all the games sorted in alphabetical order?
