import { createContext, useEffect, useState } from "react";

const GamesContext = createContext([]);

const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([])

  useEffect(() => {
    fetch('/api/games')
      .then(resp => {
        if(resp.status === 200) {
          resp.json().then(data => setGames(data))
        }
      })
  }, [])

  const addGame = game => {
    setGames([...games, game])
  }

  const addReview = (game, review) => {
    console.log('game', game)
    console.log('review', review)
    const updatedReviews = [...game.reviews, review] // add data, spread operator
    const editedGame = {
      ...game,
      reviews: updatedReviews
    }

    const updatedGames = games.map(game => {
      if(game.id === editedGame.id) {
        return editedGame;
      } else {
        return game;
      }
    })

    setGames(updatedGames)
  }

  const editReview = (updatedReview) => {
    const game = games.find(game => game.id === updatedReview.game_id)
    const updatedReviews = game.reviews.map(review => {
      if(review.id === updatedReview.id) {
        return updatedReview
      } else {
        return review
      }
    })

    const updatedGame = {
      ...game,
      reviews: updatedReviews
    }

    const updatedGames = games.map(game => {
      if(game.id === updatedGame.id) {
        return updatedGame
      } else {
        return game
      }
    })

    setGames(updatedGames)
  }

  const deleteReview = deletedReview => {
    const game = games.find(game => game.id === deletedReview.game_id)
    const updatedReviews = game.reviews.filter(review => review.id !== deletedReview.id)
    const updatedGame = {
      ...game,
      reviews: updatedReviews
    }

    const updatedGames = games.map(game => {
      if(game.id === updatedGame.id) {
        return updatedGame
      } else {
        return game
      }
    })

    setGames(updatedGames)
  }

  return <GamesContext.Provider value={{ games, addGame, addReview, editReview, deleteReview }}>{ children }</GamesContext.Provider>
}

export { GamesContext, GamesProvider };