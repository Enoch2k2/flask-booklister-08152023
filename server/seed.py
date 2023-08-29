from config import app, db
from models.models import *
from image_urls import image_url


def reset_data():
    Review.query.delete()
    Game.query.delete()
    User.query.delete()


if __name__ == '__main__':
    with app.app_context():
        reset_data()

        bob = User(
            username="Bob",
            _password_hash="testtest"
        )
        sarah = User(
            username="Sarah",
            _password_hash="testtest"
        )
        notBob = User(
            username="NotBob",
            _password_hash="testtest"
        )

        db.session.add_all([bob, sarah, notBob])
        db.session.commit()

        zelda = Game(
            title="Zelda",
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil facere sint saepe sapiente commodi? Amet ab ipsa eveniet beatae reiciendis cum excepturi debitis molestias, exercitationem vitae molestiae saepe modi blanditiis.",
            image_url=image_url
        )
        mario = Game(
            title="Mario",
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil facere sint saepe sapiente commodi? Amet ab ipsa eveniet beatae reiciendis cum excepturi debitis molestias, exercitationem vitae molestiae saepe modi blanditiis.",
            image_url=image_url
        )
        farcry = Game(
            title="Farcry",
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil facere sint saepe sapiente commodi? Amet ab ipsa eveniet beatae reiciendis cum excepturi debitis molestias, exercitationem vitae molestiae saepe modi blanditiis.",
            image_url=image_url
        )
        cod = Game(
            title="Call of Duty",
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil facere sint saepe sapiente commodi? Amet ab ipsa eveniet beatae reiciendis cum excepturi debitis molestias, exercitationem vitae molestiae saepe modi blanditiis.",
            image_url=image_url
        )

        db.session.add_all([zelda, mario, farcry, cod])
        db.session.commit()

        zelda_review_1 = Review(
            user_id=bob.id,
            game_id=zelda.id,
            content="Amazing game, 10/10"
        )

        zelda_review_2 = Review(
            user_id=sarah.id,
            game_id=zelda.id,
            content="Amazing game, 7/10"
        )

        mario_review_1 = Review(
            user_id=bob.id,
            game_id=mario.id,
            content="Basic game, 5/10"
        )
        mario_review_2 = Review(
            user_id=notBob.id,
            game_id=mario.id,
            content="Great game, 7/10"
        )
        farcry_review_1 = Review(
            user_id=sarah.id,
            game_id=farcry.id,
            content="Excellent game, 11/10"
        )
        farcry_review_2 = Review(
            user_id=notBob.id,
            game_id=farcry.id,
            content="Excellent game, 12/10"
        )
        cod_review_1 = Review(
            user_id=sarah.id,
            game_id=cod.id,
            content="Not a big fan of the cash app, 2/10"
        )

        db.session.add_all([mario_review_1, mario_review_2, zelda_review_1,
                           zelda_review_2, farcry_review_1, farcry_review_2, cod_review_1])
        db.session.commit()


# Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil facere sint saepe sapiente commodi? Amet ab ipsa eveniet beatae reiciendis cum excepturi debitis molestias, exercitationem vitae molestiae saepe modi blanditiis.
