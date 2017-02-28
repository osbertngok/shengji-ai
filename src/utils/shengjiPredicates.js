'use strict';

const Card = require('../models/cards/card');

class ShengjiPredicates {
  /*
    Type: (ShengjiGameState, DeckedCard) => bool
  */
  static isDominantCard(shengjiGameState, deckedCard) {
    return ShengjiPredicates.isJoker(deckedCard) ||
           ShengjiPredicates.isDominantRank(shengjiGameState, deckedCard) ||
           ShengjiPredicates.isDominantSuit(shengjiGameState, deckedCard);
  }

  /*
    Type: (ShengjiGameState, DeckedCard) => bool
  */
  static isDominantRank(shengjiGameState, deckedCard) {
    const currentRank = shengjiGameState.currentRank;
    const dominantCard = shengjiGameState.dominantCard;
    const card = deckedCard.card;
    return currentRank !== 14 &&
           dominantCard.suit !== Card.Suits.Joker &&
           card.suit !== Card.Suits.Joker &&
           dominantCard.rank === card.rank;
  }

  /*
    Type: (ShengjiGameState, DeckedCard) => bool
  */
  static isDominantSuit(shengjiGameState, deckedCard) {
    const currentRank = shengjiGameState.currentRank;
    const dominantCard = shengjiGameState.dominantCard;
    const card = deckedCard.card;
    return currentRank !== 14 &&
           dominantCard.suit !== Card.Suits.Joker &&
           card.suit !== Card.Suits.Joker &&
           dominantCard.suit === card.suit;
  }

  /*
    Type: (DeckedCard) => bool
  */
  static isJoker(deckedCard) {
    return deckedCard.card.suit === Card.Suits.Joker;
  }
}

module.exports = ShengjiPredicates;