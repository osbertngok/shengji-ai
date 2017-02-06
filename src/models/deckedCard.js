'use strict';
const Card = require('./card');

let deckCollection = {};

class DeckedCard {
  constructor(deckNo, suit, rank) {
    return this.getOrCreate(deckNo, suit, rank);
  }

  static compareTo(deckedCard1, deckedCard2) {
    const index1 = deckedCard1.card.getIndex();
    const index2 = deckedCard2.card.getIndex();
    if (index1 < index2) {
      return -1;
    } else if (index1 > index2) {
      return 1;
    }

    if (deckedCard1.deckNo < deckedCard2.deckNo) {
      return -1;
    } else if (deckedCard1.deckNo > deckedCard2.deckNo) {
      return 1;
    }

    return 0;
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
      Object.freeze(this);
      return this;
    }
  }

  get card() {
    return this._card;
  }

  get deckNo() {
    return this._deckNo;
  }
}

module.exports = DeckedCard;