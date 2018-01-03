/**
 * Created by osbertngok on 3/3/2017.
 */

import {Pile} from '../models/cards/pile';
import * as ShengjiUtils from './shengjiUtils';

export const isDominantCardsDeclarationValid = (potentialDeclaration, shengjiGameState, currentDeclaration) => {
  // potentialDeclaration must be a pile of at least 1 DeckedCards
  if (!potentialDeclaration || potentialDeclaration.prototype.constructor !== Pile) {
    return false;
  }

  if (!potentialDeclaration.deckedCards.length) {
    return false;
  }

  // Must be of the same suit / rank
  let suit = null;
  let rank = null;
  for (const deckedCard of potentialDeclaration.deckedCards) {
    if (suit === null && rank === null) {
      suit = deckedCard.suit;
      rank = deckedCard.rank;
      continue;
    }

    if (suit !== deckedCard.suit) {
      return false;
    }

    if (rank !== deckedCard.rank) {
      return false;
    }
  }
  const firstDeckedCard = potentialDeclaration.deckedCards[0];
  if (!ShengjiUtils.predicates.isJoker(firstDeckedCard) &&
    !ShengjiUtils.predicates.isDominantRank(shengjiGameState, firstDeckedCard)) {
    return false;
  }

  const noOfDeckedCardsInCurrentDeclaration = currentDeclaration ? currentDeclaration.deckedCards.length : 0;

};
