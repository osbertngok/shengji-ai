'use strict';
import {DeckedCard} from './deckedCard';
import {Pile} from './pile';

class ImmutablePile {

  private _deckedCards: DeckedCard[];

  constructor(arrayOfDeckedCards: DeckedCard[]) {
    if (arrayOfDeckedCards === undefined) {
      this._deckedCards = [];
    }

    this._deckedCards = Array.from(arrayOfDeckedCards);
    Object.freeze(this._deckedCards);
    Object.freeze(this);
    return this;
  }

  static toImmutablePile(pile): ImmutablePile {
    return new ImmutablePile(pile.deckedCards);
  }

  pileClone(): Pile {
    return new Pile(this._deckedCards);
  }

  prettyPrint(shengjiGameState): string {
    const pileForPrettyPrint = this.pileClone();
    pileForPrettyPrint.sort(shengjiGameState);
    return pileForPrettyPrint.deckedCards
      .map(deckedCard => deckedCard.card.toString())
      .join(' ');
  }

  get deckedCards(): DeckedCard[] {
    return Array.from(this._deckedCards);
  }

  get length(): number {
    if (!this._deckedCards) {
      return 0;
    }

    return this._deckedCards.length;
  }
}
