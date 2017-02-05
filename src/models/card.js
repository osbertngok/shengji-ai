'use strict';
const ShengjiErrorFactory = require('./shengjiError');

const Suits = {
  'Spade'   : 0,
  'Heart'   : 1,
  'Club'    : 2,
  'Diamond' : 3,
  'Joker'   : 4
};

let cardCollection = Array(54);

class Card {
  constructor(suit, rank) {
    this.validate(suit, rank);
    return this.getOrCreate(suit, rank);
  }

  static getIndex(suit, rank) {
    return suit * 13 + rank - 1;
  }

  getIndex() {
    return Card.getIndex(this.suit, this.rank);
  }

  getOrCreate(suit, rank) {
    const index = Card.getIndex(suit, rank);
    const existingCard = cardCollection[index];
    if (existingCard) {
      return existingCard;
    } else {
      this._suit = suit;
      this._rank = rank;
      cardCollection[index] = this;
      return this;
    }
  }

  validate(suit, rank) {
    switch (suit) {
      case Suits.Spade:
      case Suits.Heart:
      case Suits.Club:
      case Suits.Diamond:
          if (typeof rank !== 'number' || !Number.isInteger(rank) || rank < 1 || rank > 13) {
              throw ShengjiErrorFactory.invalidRank();
          }
        break;
      case Suits.Joker:
          if (typeof rank !== 'number' || !Number.isInteger(rank) || rank < 1 || rank > 2) {
              throw ShengjiErrorFactory.invalidRank();
          }
        break;
      default:
        throw ShengjiErrorFactory.invalidSuit();
    }
  }

  get suit() {
    return this._suit;
  }

  get rank() {
    return this._rank;
  }
}

Card.Suits = Suits;

module.exports = Card;