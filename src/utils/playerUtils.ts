/**
 * Created by osbertngok on 3/3/2017.
 */

import {Card, Suits} from '../models/cards/card';
import {DeckedCard} from '../models/cards/deckedCard';
import {isPile, Pile} from '../models/cards/pile';
import {ShengjiGameState} from '../models/statemachines/shengjiGameState';
import * as ShengjiUtils from './shengjiUtils';

export const isDominantCardsDeclarationValid = (potentialDeclaration: Pile | null,
                                                shengjiGameState: ShengjiGameState,
                                                currentDeclaration: Pile | null): boolean => {
  // potentialDeclaration must be a pile of at least 1 DeckedCards
  if (!potentialDeclaration || !isPile(potentialDeclaration)) {
    return false;
  }

  if (!potentialDeclaration.deckedCards.length) {
    return false;
  }

  // Must be of the same suit / rank
  let suit: Suits | null = null;
  let rank: number | null = null;
  for (const deckedCard of potentialDeclaration.deckedCards) {
    const card: Card = deckedCard.card;
    if (suit === null && rank === null) {
      suit = card.suit;
      rank = card.rank;
      continue;
    }

    if (suit !== card.suit) {
      return false;
    }

    if (rank !== card.rank) {
      return false;
    }
  }
  const firstDeckedCard: DeckedCard = potentialDeclaration.deckedCards[0];
  if (!ShengjiUtils.predicates.isJoker(firstDeckedCard) &&
    !ShengjiUtils.predicates.isDominantRank(shengjiGameState, firstDeckedCard)) {
    return false;
  }

  const noOfDeckedCardsInCurrentDeclaration: number = currentDeclaration ? currentDeclaration.deckedCards.length : 0;
  throw new Error('Not Implemented');
};
