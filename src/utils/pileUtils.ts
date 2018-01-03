/**
 * Created by osbertngok on 2/3/2017.
 */
'use strict';
import {DeckedCard} from '../models/cards/deckedCard';
import {Pile} from '../models/cards/pile';

export const intersection = (...piles: Pile[]): Pile => {
  // If two DeckedCards share the same deckNo, suit and rank
  // It is guaranteed that they are reference-ly equal
  // So just feel free to filter
  if (piles.length === 0) {
    return new Pile([]);
  }
  if (piles.length === 1) {
    return piles[0];
  }
  const filteredPile: Pile = new Pile(piles[0].deckedCards
    .filter((dc: DeckedCard) => piles[1].deckedCards.includes(dc)));
  return intersection(...[filteredPile, ...piles.slice(2)]);
};

export const concat = (...piles: Pile[]): Pile => {
  // Ditto
  if (piles.length === 0) {
    return new Pile([]);
  }
  if (piles.length === 1) {
    return piles[0];
  }
  // Compile first two, and return the rest
  const mergedPile: Pile = new Pile(
    Array.from(
      new Set<DeckedCard>([...piles[0].deckedCards,
        ...piles[1].deckedCards])));
  return concat(...[mergedPile, ...piles.slice(2)]);
};
