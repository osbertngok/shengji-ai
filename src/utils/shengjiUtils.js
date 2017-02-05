'use strict';

const Card = require('../models/card');

class ShengjiUtils {
  constructor() {

  }

  /*
    Type: (ShengjiGameState, DeckedCard, DeckedCard) => int
  */
  static compareDominantCards(shengjiGameState, deckedCard1, deckedCard2) {
    // Jokers
    // Rank
    // Same Suit
    const compareByJokerFunc =
      ShengjiUtils.getDivideAndCompareFunc(
        ShengjiUtils.isJoker,
        (deckedCard1, deckedCard2) =>
          (shengjiGameState) =>
            ShengjiUtils.compareDominantNonJokerCards(
              shengjiGameState,
              deckedCard1,
              deckedCard2
            ),
          ShengjiUtils.compareJokerCards
          );
    return compareByJokerFunc(deckedCard1, deckedCard2);
  }

  /*
    Type: (ShengjiGameState, DeckedCard, DeckedCard) => int
  */
  static compareDominantNonJokerCards(shengjiGameState, deckedCard1, deckedCard2) {
    const currentRank = shengjiGameState.currentRank;
    if (currentRank === 14) {
      return ShengjiUtils.compareSameSuitCards(deckedCard1, deckedCard2);
    } else {
      const compareFunc = ShengjiUtils.DivideAndCompareFunc([
        (deckedCard) => {
          return ShengjiUtils.isDominantRank(shengjiGameState, deckedCard);
        },
        (deckedCard1, deckedCard2) => {
          return ShengjiUtils.compareSameSuitDeckedCards(deckedCard1, deckedCard2);
        },
        (deckedCard1, deckedCard2) => {
          const dominantCard = shengjiGameState.dominantCard;
          if (dominantCard.suit === Card.Suits.Joker) {
            const compareFunc = ShengjiUtils.getHierarchicalCompareFunc([
              (deckedCard1, deckedCard2) => {
                return ShengjiUtils.compareNumber(
                  deckedCard1.card.suit, 
                  deckedCard2.card.suit
                );
              },
              (deckedCard1, deckedCard2) => {
                return ShengjiUtils.compareNumber(
                  deckedCard1.deckNo, 
                  deckedCard2.deckNo
                );
              }
            ]);
            return compareFunc(deckedCard1, deckedCard2);
          } else {
            const compareFunc = ShengjiUtils.getDivideAndCompareFunc(
              (deckedCard) => {
                return dominantCard.suit === deckedCard.suit;
              },
              (deckedCard1, deckedCard2) => {
                return ShengjiUtils.compareNonDominantCards(deckedCard1, deckedCard2);
              },
              (deckedCard1, deckedCard2) => {
                return ShengjiUtils.compareNumber(deckedCard1.deckNo, deckedCard2.deckNo);
              }
            );
            return compareFunc(deckedCard1, deckedCard2);
          }
        }
      ]);
    }
  }

  /*
    Type: (DeckedCard, DeckedCard) => int
  */
  static compareJokerCards(deckedCard1, deckedCard2) {
    const compareFunc = ShengjiUtils.getHierarchicalCompareFunc([
        (deckedCard1, deckedCard2) => {
          return ShengjiUtils.compareNumber(deckedCard1.card.rank, deckedCard2.card.rank);
        },
        (deckedCard1, deckedCard2) => {
          return ShengjiUtils.compareNumber(deckedCard1.deckNo, deckedCard2.deckNo);
        }
      ]);
    return compareFunc(deckedCard1, deckedCard2);
  }

  /*
    Type: (DeckedCard, DeckedCard) => int
  */
  static compareNonDominantCards(deckedCard1, deckedCard2) {
    // Also applicable to Jokers
    const compareFunc = ShengjiUtils.getHierarchicalCompareFunc([
      (deckedCard1, deckedCard2) => {
        return ShengjiUtils.compareNumber(deckedCard1.card.suit, deckedCard2.card.suit);
      },
      ShengjiUtils.compareSameSuitDeckedCards
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
  static compareSameSuitDeckedCards(deckedCard1, deckedCard2){
    const compareFunc = ShengjiUtils.getHierarchicalCompareFunc([
      (deckedCard1, deckedCard2) => {
        let shiftedWeight1 = deckedCard1.card.rank;
        let shiftedWeight2 = deckedCard2.card.rank;
        if (deckedCard1.card.suit !== Card.Suits.Joker) {
          shiftedWeight1 = (shiftedWeight1 + 11) % 13;
          shiftedWeight2 = (shiftedWeight2 + 11) % 13;
        }
        return ShengjiUtils.compareNumber(shiftedWeight1, shiftedWeight2);
      },
      (deckedCard1, deckedCard2) => {
        return ShengjiUtils.compareNumber(deckedCard1.deckNo, deckedCard2.deckNo);
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
        return shengjiGameState.compareNonDominantCards(deckedCard1, deckedCard2);
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
        ShengjiUtils.getDivideAndCompareFunc(
          (deckedCard) => 
            ShengjiUtils.isDominantCard(shengjiGameState, deckedCard),
          ShengjiUtils.compareNonDominantCards,
          (deckedCard1, deckedCard2) =>
            ShengjiUtils.compareDominantCards(shengjiGameState,
                                                deckedCard1,
                                                deckedCard2)
      );
      return compareByDominantCardFunc(deckedCard1, deckedCard2);
    }
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
    }
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
          return ShengjiUtils.getHierarchicalCompareFunc(compareFuncArray.slice(1))(
            deckedCard1,
            deckedCard2
          );
        }
      } else {
        return 0;
      }
      
    };
  }

  /*
    Type: (ShengjiGameState, DeckedCard) => bool
  */
  static isDominantCard(shengjiGameState, deckedCard) {
    return ShengjiUtils.isJoker(deckedCard) ||
           ShengjiUtils.isDominantRank(shengjiGameState, deckedCard) ||
           ShengjiUtils.isDominantSuit(shengjiGameState, deckedCard);
  }

  /*
    Type: (ShengjiGameState, DeckedCard) => bool
  */
  static isDominantRank(shengjiGameState, deckedCard) {
    const currentRank = shengjiGameState.currentRank;
    const dominantCard = shengjiGameState.dominantCard;
    const card = deckedCard.card;
    return currentRank !== 14 &&
           dominantCard.suit !== Card.Suits.Joker &&
           card.suit !== Card.Suits.Joker &&
           dominantCard.rank === card.rank;
  }

  /*
    Type: (ShengjiGameState, DeckedCard) => bool
  */
  static isDominantSuit(shengjiGameState, deckedCard) {
    const currentRank = shengjiGameState.currentRank;
    const dominantCard = shengjiGameState.dominantCard;
    const card = deckedCard.card;
    return currentRank !== 14 &&
           dominantCard.suit !== Card.Suits.Joker &&
           card.suit !== Card.Suits.Joker &&
           dominantCard.suit === card.suit;
  }

  /*
    Type: (DeckedCard) => bool
  */
  static isJoker(deckedCard) {
    return deckedCard.card.suit === Card.Suits.Joker;
  }
}

module.exports = ShengjiUtils;