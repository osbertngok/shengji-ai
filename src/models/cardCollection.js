const Card = require('./card');

let cardCollection = null;

class CardCollection {
  constructor() {
    if (!cardCollection) {
      // Not initialized yet
      cardCollection = this;
      this.initialize();   
    }
    return cardCollection;
  },
  initialize() {
    this._cards = [];

    for (let suit = 0; suit < 4; ++i) {
      for (let rank = 1; rank < 13; ++rank) {
        this._cards.push(new Card())
      }
    }
  }
};