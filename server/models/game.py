from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates


class Game(db.Model, SerializerMixin):
    __tablename__ = "games"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    image_url = db.Column(db.String)

    reviews = db.relationship("Review",
                              back_populates="game")
    users = db.relationship("User",
                            secondary="reviews",
                            back_populates="games")

    serialize_rules = (
        "-reviews.game",
        "-reviews.user.reviews",
        "-reviews.user.games",
        "-reviews.user._password_hash",
        "-users"
    )

    @validates("title")
    def validate_title(self, key, title):
        if not title:
            raise ValueError("Title Must Exist")

        return title

    def __repr__(self):
        return f'<Game { self.id } { self.title }>'


# title : string
# description : string
# image_url : string
