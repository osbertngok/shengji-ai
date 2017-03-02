'use strict';
const ShengjiErrorUtils = require('./../errors/shengjiErrorUtils');

const Card = require('./card');
const DeckedCard = require('./deckedCard');
const Pile = require('./pile');

class Deck {
  constructor(deckNo) {
    // Construct a deck
    this._deckedCards = Array(54);

    for (let suit = 0; suit < 4; ++ suit) {
      for (let rank = 1; rank <= 13; ++rank) {
        const index = Card.getIndex(suit, rank);
        this._deckedCards[index] = new DeckedCard(deckNo, suit, rank);
      }
    }

    for (let rank = 1; rank <=2; ++rank) {
      const index = Card.getIndex(Card.Suits.Joker, rank);
      this._deckedCards[index] = new DeckedCard(deckNo, Card.Suits.Joker, rank);
    }
  }

  toPile() {
    return new Pile(this._deckedCards);
  }
}

module.exports = Deck;