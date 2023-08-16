from config import db
from sqlalchemy_serializer import SerializerMixin


class Game(db.Model, SerializerMixin):
    __tablename__ = "games"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    image_url = db.Column(db.String)

    def __repr__(self):
        return f'<Game { self.id } { self.title }>'


# title : string
# description : string
# image_url : string
