from config import db
from sqlalchemy import ForeignKey
from sqlalchemy_serializer import SerializerMixin


class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    user_id = db.Column(db.Integer, ForeignKey("users.id"))
    game_id = db.Column(db.Integer, ForeignKey("games.id"))

    user = db.relationship("User", back_populates="reviews")
    game = db.relationship("Game", back_populates="reviews")

    serialize_rules = (
        "-user.games",
        "-user.reviews",
        "-user._password_hash",
        "-game.users",
        "-game.reviews"
    )

    def __repr__(self):
        return f'<Review { self.id } { self.content }>'
