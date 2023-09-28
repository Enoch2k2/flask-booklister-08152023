from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)

    reviews = db.relationship("Review", back_populates="user")
    games = db.relationship("Game", secondary="reviews",
                            back_populates="users")

    serialize_rules = (
        "-games",
        "-reviews.user"
    )

    @validates("username")
    def validate_username(self, key, username):
        if not username:
            raise ValueError("Username must exist")
        elif len(username) < 3:
            raise ValueError(
                "Username must be at least 3 characters in length.")
        return username

    @hybrid_property
    def password_hash(self):
        raise Exception("You cannot view the password hash.")

    @password_hash.setter
    def password_hash(self, password):
        # a string of bytes
        hashed_password = bcrypt.generate_password_hash(
            password)
        # decoded to a string of characters for storing in database
        self._password_hash = hashed_password.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    def __repr__(self):
        return f'<User {self.id} {self.username}>'
