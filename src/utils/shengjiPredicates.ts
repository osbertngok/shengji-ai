'use strict';

import {Card, Suits} from '../models/cards/card';
import {DeckedCard} from '../models/cards/deckedCard';
import {ShengjiGameState} from '../models/statemachines/shengjiGameState';

export class ShengjiPredicates {
  /*
   Type: (ShengjiGameState, DeckedCard) => bool
   */
  static isDominantCard(shengjiGameState: ShengjiGameState, deckedCard: DeckedCard): boolean {
    return ShengjiPredicates.isJoker(deckedCard) ||
      ShengjiPredicates.isDominantRank(shengjiGameState, deckedCard) ||
      ShengjiPredicates.isDominantSuit(shengjiGameState, deckedCard);
  }

  /*
   Type: (ShengjiGameState, DeckedCard) => bool
   */
  static isDominantRank(shengjiGameState: ShengjiGameState, deckedCard: DeckedCard): boolean {
    const currentRank: number = shengjiGameState.currentRank;
    const dominantCard: Card | null = shengjiGameState.dominantCard;
    if (dominantCard === null) {
      throw new Error('dominant card is not set');
    } else {
      const card: Card = deckedCard.card;
      return currentRank !== 14 &&
        dominantCard.suit !== Suits.Joker &&
        card.suit !== Suits.Joker &&
        dominantCard.rank === card.rank;
    }
  }

  /*
   Type: (ShengjiGameState, DeckedCard) => bool
   */
  static isDominantSuit(shengjiGameState: ShengjiGameState, deckedCard: DeckedCard): boolean {
    const currentRank: number = shengjiGameState.currentRank;
    const dominantCard: Card | null = shengjiGameState.dominantCard;
    if (dominantCard === null) {
      throw new Error('dominant card is not set');
    } else {
      const card = deckedCard.card;
      return currentRank !== 14 &&
        dominantCard.suit !== Suits.Joker &&
        card.suit !== Suits.Joker &&
        dominantCard.suit === card.suit;
    }
  }

  /*
   Type: (DeckedCard) => bool
   */
  static isJoker(deckedCard: DeckedCard): boolean {
    return deckedCard.card.suit === Suits.Joker;
  }
}
