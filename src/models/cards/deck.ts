'use strict';
import {Card, Suits} from './card';
import {DeckedCard} from './deckedCard';
import {Pile} from './pile';

export class Deck {

  private _deckedCards: DeckedCard[];
  constructor(deckNo: number) {
    // Construct a deck
    this._deckedCards = Array(54);

    for (let suit: Suits = Suits.Spade; suit < Suits.Joker; ++suit) {
      for (let rank: number = 1; rank <= 13; ++rank) {
        const index: number = Card.getIndex(suit, rank);
        this._deckedCards[index] = new DeckedCard(deckNo, suit, rank);
      }
    }

    for (let rank: number = 1; rank <= 2; ++rank) {
      const index: number = Card.getIndex(Suits.Joker, rank);
      this._deckedCards[index] = new DeckedCard(deckNo, Suits.Joker, rank);
    }
  }

  toPile(): Pile {
    return new Pile(this._deckedCards);
  }
}
