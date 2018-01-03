'use strict';

import {Card, Suits} from '../models/cards/card';

import {DeckedCard} from '../models/cards/deckedCard';
import {ShengjiGameState} from '../models/statemachines/shengjiGameState';
import {ShengjiPredicates as Predicates} from './shengjiPredicates';

export class ShengjiCompare {

  /*
   Type: (ShengjiGameState, DeckedCard, DeckedCard) => int
   */
  static compareDominantCards(shengjiGameState: ShengjiGameState,
                              deckedCard1: DeckedCard,
                              deckedCard2: DeckedCard): number {
    // Jokers
    // Rank
    // Same Suit
    const compareByJokerFunc =
      ShengjiCompare.getDivideAndCompareFunc(
        Predicates.isJoker,
        (dc1: DeckedCard, dc2: DeckedCard) =>
          ShengjiCompare.compareDominantNonJokerCards(
            shengjiGameState,
            dc1,
            dc2
          ),
        ShengjiCompare.compareJokerCards
      );
    return compareByJokerFunc(deckedCard1, deckedCard2);
  }

  /*
   Type: (ShengjiGameState, DeckedCard, DeckedCard) => int
   */
  static compareDominantNonJokerCards(shengjiGameState: ShengjiGameState,
                                      deckedCard1: DeckedCard,
                                      deckedCard2: DeckedCard): number {
    if (shengjiGameState.dominantCard === null) {
      throw new Error('dominant Card not exist');
    } else {
      const currentRank = shengjiGameState.currentRank;
      if (currentRank === 14) {
        return ShengjiCompare.compareSameSuitDeckedCards(deckedCard1, deckedCard2);
      } else {
        const compareFunc = ShengjiCompare.getDivideAndCompareFunc( deckedCard => {
            return Predicates.isDominantRank(shengjiGameState, deckedCard);
          },
          (dc1: DeckedCard, dc2: DeckedCard) => {
            return ShengjiCompare.compareSameSuitDeckedCards(dc1, dc2);
          },
          (dc1: DeckedCard, dc2: DeckedCard) => {
            const dominantCard: Card = shengjiGameState.dominantCard as Card;
            if (dominantCard.suit === Suits.Joker) {
              const internalCompareFunc = ShengjiCompare.getHierarchicalCompareFunc([
                (ddc1: DeckedCard, ddc2: DeckedCard) => {
                  return ShengjiCompare.compareNumber(
                    ddc1.card.suit,
                    ddc2.card.suit
                  );
                },
                (ddc1: DeckedCard, ddc2: DeckedCard) => {
                  return ShengjiCompare.compareNumber(
                    ddc1.deckNo,
                    ddc2.deckNo
                  );
                }
              ]);
              return internalCompareFunc(dc1, dc2);
            } else {
              const internalCompareFunc = ShengjiCompare.getDivideAndCompareFunc( deckedCard =>
                  Predicates.isDominantRank(shengjiGameState, deckedCard),
                ShengjiCompare.compareNonDominantCards,
                ShengjiCompare.getDivideAndCompareFunc( deckedCard => {
                    return dominantCard.suit === deckedCard.card.suit;
                  },
                  (ddc1: DeckedCard, ddc2: DeckedCard) => {
                    return ShengjiCompare.compareNonDominantCards(ddc1, ddc2);
                  },
                  (ddc1: DeckedCard, ddc2: DeckedCard) => {
                    return ShengjiCompare.compareNumber(ddc1.deckNo, ddc2.deckNo);
                  }
                )
              );
              return internalCompareFunc(dc1, dc2);
            }
          }
        );
        return compareFunc(deckedCard1, deckedCard2);
      }
    }
  }

  /*
   Type: (DeckedCard, DeckedCard) => int
   */
  static compareJokerCards(deckedCard1: DeckedCard, deckedCard2: DeckedCard) {
    const compareFunc = ShengjiCompare.getHierarchicalCompareFunc([
      (dc1: DeckedCard, dc2: DeckedCard) => {
        return ShengjiCompare.compareNumber(dc1.card.rank, dc2.card.rank);
      },
      (dc1: DeckedCard, dc2: DeckedCard) => {
        return ShengjiCompare.compareNumber(dc1.deckNo, dc2.deckNo);
      }
    ]);
    return compareFunc(deckedCard1, deckedCard2);
  }

  /*
   Type: (DeckedCard, DeckedCard) => int
   */
  static compareNonDominantCards(deckedCard1, deckedCard2) {
    // Also applicable to Jokers
    const compareFunc = ShengjiCompare.getHierarchicalCompareFunc([
      (dc1: DeckedCard, dc2: DeckedCard) => {
        return ShengjiCompare.compareNumber(dc1.card.suit, dc2.card.suit);
      },
      ShengjiCompare.compareSameSuitDeckedCards
    ]);
    return compareFunc(deckedCard1, deckedCard2);
  }

  /*
   Type: (int, int) => int
   */
  static compareNumber(num1, num2) {
    if (num1 < num2) {
      return -1;
    } else if (num1 > num2) {
      return 1;
    } else {
      return 0;
    }
  }

  /*
   Type: (DeckedCard, DeckedCard) => int
   */
  static compareSameSuitDeckedCards(deckedCard1, deckedCard2) {
    const compareFunc = ShengjiCompare.getHierarchicalCompareFunc([
      (dc1: DeckedCard, dc2: DeckedCard) => {
        let shiftedWeight1 = dc1.card.rank;
        let shiftedWeight2 = dc2.card.rank;
        if (dc1.card.suit !== Suits.Joker) {
          shiftedWeight1 = (shiftedWeight1 + 11) % 13;
          shiftedWeight2 = (shiftedWeight2 + 11) % 13;
        }
        return ShengjiCompare.compareNumber(shiftedWeight1, shiftedWeight2);
      },
      (dc1: DeckedCard, dc2: DeckedCard) => {
        return ShengjiCompare.compareNumber(dc1.deckNo, dc2.deckNo);
      }
    ]);
    return compareFunc(deckedCard1, deckedCard2);
  }

  /*
   Type: (ShengjiGameState) =>
   (DeckedCard, DeckedCard) => int
   */
  static getDeckedCardSortFunc(shengjiGameState) {
    return (deckedCard1, deckedCard2) => {
      const currentRank = shengjiGameState.currentRank;
      if (currentRank === 14) {
        // 1) Current Rank is Joker
        // Non-dominant Suit 1
        // Non-dominant Suit 2
        // Non-dominant Suit 3
        // Non-dominant Suit 4
        // Black Jokers
        // Red Jokers
        return ShengjiCompare.compareNonDominantCards(deckedCard1, deckedCard2);
      }
      // 2)
      // Non-dominant Suit 1
      // Non-dominant Suit 2
      // Non-dominant Suit 3
      // Dominant Suit
      // Non-dominant Suit, Dominant Rank
      // Dominant Suit, Dominant Rank
      // Black Jokers
      // Red Jokers
      const compareByDominantCardFunc =
        ShengjiCompare.getDivideAndCompareFunc( deckedCard =>
            Predicates.isDominantCard(shengjiGameState, deckedCard),
          ShengjiCompare.compareNonDominantCards,
          (dc1: DeckedCard, dc2: DeckedCard) =>
            ShengjiCompare.compareDominantCards(shengjiGameState,
              dc1,
              dc2)
        );
      return compareByDominantCardFunc(deckedCard1, deckedCard2);
    };
  }

  /*
   Type: (DeckedCard => bool, (DeckedCard, DeckedCard) => int, (DeckedCard, DeckedCard) => int) =>
   (DeckedCard, DeckedCard) => int
   */
  static getDivideAndCompareFunc(predicateFunc, falseCompareFunc, trueCompareFunc) {
    return (deckedCard1, deckedCard2) => {
      const predicateResult1 = predicateFunc(deckedCard1);
      const predicateResult2 = predicateFunc(deckedCard2);
      if (!predicateResult1 && !predicateResult2) {
        return falseCompareFunc(deckedCard1, deckedCard2);
      } else if (!predicateResult1 && predicateResult2) {
        return -1;
      } else if (predicateResult1 && !predicateResult2) {
        return 1;
      } else {
        return trueCompareFunc(deckedCard1, deckedCard2);
      }
    };
  }

  /*
   Type: (((DeckedCard, DeckedCard) => int)[]) =>
   (DeckedCard, DeckedCard) => int
   */
  static getHierarchicalCompareFunc(compareFuncArray) {
    return (deckedCard1, deckedCard2) => {
      // Belts and Braces
      if (compareFuncArray.length) {
        const compareFunc = compareFuncArray[0];
        const compareResult = compareFunc(deckedCard1, deckedCard2);
        if (compareResult) {
          return compareResult;
        } else {
          return ShengjiCompare.getHierarchicalCompareFunc(compareFuncArray.slice(1))(
            deckedCard1,
            deckedCard2
          );
        }
      } else {
        return 0;
      }

    };
  }
}
