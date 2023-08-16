from config import db
from sqlalchemy import ForeignKey
from sqlalchemy_serializer import SerializerMixin


class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    user_id = db.Column(db.Integer, ForeignKey("users.id"))
    game_id = db.Column(db.Integer, ForeignKey("games.id"))

    def __repr__(self):
        return f'<Review { self.id } { self.content }>'
