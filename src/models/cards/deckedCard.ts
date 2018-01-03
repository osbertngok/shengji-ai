'use strict';
import {Card, Suits} from './card';

const deckCollection = {};

export class DeckedCard {

  private _card: Card;

  private _deckNo: number;

  constructor(deckNo: number, suit: Suits, rank: number) {
    return this.getOrCreate(deckNo, suit, rank);
  }

  static compareTo(deckedCard1: DeckedCard, deckedCard2: DeckedCard) {
    const index1: number = deckedCard1.card.getIndex();
    const index2: number = deckedCard2.card.getIndex();
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

  getOrCreate(deckNo: number, suit: Suits, rank: number) {
    let existingDeck: DeckedCard = deckCollection[deckNo];
    if (!existingDeck) {
      deckCollection[deckNo] = Array(54);
      existingDeck = deckCollection[deckNo];
    }

    const index: number = Card.getIndex(suit, rank);
    const existingCard: DeckedCard | undefined = existingDeck[index];
    if (existingCard !== undefined) {
      return existingCard;
    } else {
      this._deckNo = deckNo;
      this._card = new Card(suit, rank);
      existingDeck[index] = this;
      Object.freeze(this);
      return this;
    }
  }

  get card(): Card {
    return this._card;
  }

  get deckNo(): number {
    return this._deckNo;
  }
}
