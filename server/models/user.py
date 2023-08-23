from config import db
from sqlalchemy_serializer import SerializerMixin


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)

    reviews = db.relationship("Review", back_populates="user")
    games = db.relationship("Game", secondary="reviews",
                            back_populates="users")

    serialize_rules = (
        "-games.reviews",
        "-games.users",
        "-reviews.user"
    )

    def __repr__(self):
        return f'<User {self.id} {self.username}>'
