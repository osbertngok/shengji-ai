'use strict';
const Card = require('./card');
const DeckedCard = require('./deckedCard');
const ShengjiErrorFactory = require('./../errors/shengjiError');

class Pile {
  constructor(arrayOfDeckedCards) {
    if (arrayOfDeckedCards === undefined) {
      this._deckedCards = [];
    }

    this._deckedCards = Array.from(arrayOfDeckedCards);
    return this;
  }

  addCard(deckedCard) {
    this._deckedCards.push(deckedCard);
  }

  clone() {
    return new Pile(this.deckedCards);
  }

  dealCard() {
    const card = this._deckedCards.shift();
    return card;
  }

  prettyPrint(shengjiGameState) {
    const pileForPrettyPrint = this.clone();
    pileForPrettyPrint.sort(shengjiGameState);
    return pileForPrettyPrint.deckedCards
                             .map(deckedCard => deckedCard.card.toString())
                             .join(' ');
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
    } else if (typeof func !== 'function') {
      throw ShengjiErrorFactory.invalidSortFunction();
    } else {
      this.deckedCards.sort(func);
    }
  }

  get deckedCards() {
    return this._deckedCards;
  }

  get length() {
    if (!this._deckedCards) {
      return 0;
    }

    return this._deckedCards.length;
  }
}

module.exports = Pile;