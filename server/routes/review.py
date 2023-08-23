from flask_restful import Resource
from config import api
from models.models import Review


class ReviewsResource(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return reviews, 200


api.add_resource(ReviewsResource, "/api/reviews")

# GET /games would give back all of the games, index (READ)
# POST /games would create one game, CREATE

# GET /games/<int:id> gives us one game READ
# PATCH /games/<int:id> updating a game
# DELETE /games/<int:id> destroying a game
