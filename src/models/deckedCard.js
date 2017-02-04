'use strict';
const Card = require('./card');

let deckCollection = {};

class DeckedCard {
  constructor(deckNo, suit, rank) {
    return this.getOrCreate(deckNo, suit, rank);
  }

  getOrCreate(deckNo, suit, rank) {
    let existingDeck = deckCollection[deckNo];
    if (!existingDeck) {
      deckCollection[deckNo] = Array(54);
      existingDeck = deckCollection[deckNo];
    }

    const index = Card.getIndex(suit, rank);
    const existingCard = existingDeck[index];
    if (existingCard) {
      return existingCard;
    } else {
      this._deckNo = deckNo;
      this._card = new Card(suit, rank);
      existingDeck[index] = this;
      return this;
    }
  }
}

module.exports = DeckedCard;