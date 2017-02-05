'use strict';
const Card = require('./card');
const DeckedCard = require('./deckedCard');

class Pile {
  constructor(arrayOfDeckedCards) {
    if (arrayOfDeckedCards === undefined) {
      this._deckedCards = [];
    }

    this._deckedCards = Array.from(arrayOfDeckedCards);
  }

  addCard(deckedCard) {
    this._deckedCards.push(deckedCard);
  }

  dealCard() {
    const card = this._deckedCards.shift();
    return card;
  }

  shuffle() {
    let remainExchanges = _deckedCards.length;
    while(remainExchanges){
      const randomIndex = Math.floor(Math.random() * remainExchanges);
      remainExchanges--;

      let tmp = this._dekcedCards[randomIndex];
      this._dekcedCards[randomIndex] = this._dekcedCards[remainExchanges];
      this._dekcedCards[remainExchanges] = tmp;
    }
  }

  sort(func) {
    if (func === undefined) {
      this.deckedCards.sort(DeckedCard.compareTo);
    } else {
      his.deckedCards.sort(func);
    }
  }

  get length() {
    if (!this._deckedCards) {
      return 0;
    }

    return this._deckedCards.length;
  }
}

module.exports = Pile;