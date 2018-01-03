'use strict';
import {Card, Suits} from './card';
import {DeckedCard} from './deckedCard';
import {Pile} from './pile';

export class Deck {

  private _deckedCards: DeckedCard[];
  constructor(deckNo) {
    // Construct a deck
    this._deckedCards = Array(54);

    for (let suit = 0; suit < 4; ++suit) {
      for (let rank = 1; rank <= 13; ++rank) {
        const index = Card.getIndex(suit, rank);
        this._deckedCards[index] = new DeckedCard(deckNo, suit, rank);
      }
    }

    for (let rank = 1; rank <= 2; ++rank) {
      const index = Card.getIndex(Suits.Joker, rank);
      this._deckedCards[index] = new DeckedCard(deckNo, Suits.Joker, rank);
    }
  }

  toPile() {
    return new Pile(this._deckedCards);
  }
}
