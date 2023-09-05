from flask import request, session
from flask_restful import Resource
from config import api, db
from models.models import Review
from routes.helpers import login_authorization

'''
  game {
  
    reviews: []
  }
'''


class ReviewsResource(Resource):
    def post(self):
        if not login_authorization():
            return {'error': 'not authorized'}, 401

        data = request.get_json()
        user_id = session["user_id"]
        game_id = data.get("game_id")
        content = data.get("content")

        try:
            review = Review(
                user_id=user_id,
                game_id=game_id,
                content=content
            )
            db.session.add(review)
            db.session.commit()

            return review.to_dict(), 201
        except ValueError as err:
            return {'error': str(err)}, 422


class ReviewResource(Resource):
    def patch(self, id):
        review = find_review(id)
        if review:
            if review.user_id == session.get('user_id'):
                try:
                    data = request.get_json()
                    for key in data.keys():
                        # key content
                        # value something different then what's there
                        # checks if it has an attribute of that key
                        if key != "user_id" and key != "game_id" and hasattr(review, key):
                            setattr(review, key, data[key])
                    db.session.add(review)
                    db.session.commit()
                    return review.to_dict(), 200
                except ValueError as err:
                    return {'error': str(err)}, 422
            else:
                return {'error': 'Unauthorized'}, 401
        else:
            return {'error': 'review does not exist'}, 401

    def delete(self, id):
        review = find_review(id)
        if review:
            if review.user_id == session["user_id"]:
                db.session.delete(review)
                db.session.commit()
                return {'message': 'review has been deleted'}, 200
            else:
                return {'error': "Unauthorized"}, 401
        else:
            return {'error': 'Review does not exist'}, 401


def find_review(id):
    return Review.query.filter_by(id=id).first()


api.add_resource(ReviewsResource, "/api/reviews")
api.add_resource(ReviewResource, "/api/reviews/<int:id>")

# GET /games would give back all of the games, index (READ)
# POST /games would create one game, CREATE

# GET /games/<int:id> gives us one game READ
# PATCH /games/<int:id> updating a game
# DELETE /games/<int:id> destroying a game
