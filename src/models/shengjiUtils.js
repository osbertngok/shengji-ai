'use strict';

class ShengjiUtils {
  constructor() {

  }

  static compareNonDominantCards(deckedCard1, deckedCard2) {
    // Also applicable to Jokers
    const suit1 = deckedCard1.card.suit;
    const suit2 = deckedCard2.card.suit;
    const suitCompareResult = ShengjiUtils.compareNumber(suit1, suit2);
    if (suitCompareResult !== 0){
      return suitCompareResult;
    } else {
      return compareSameSuitDeckedCards(deckedCard1, deckedCard2)
    }
  }

  static compareNumber(num1, num2) {
    if (num1 < num2) {
      return -1;
    } else if (num1 > num2) {
      return 1;
    } else {
      return 0;
    }
  }

  static compareSameSuitDeckedCards(deckedCard1, deckedCard2){
    let shiftedWeight1 = deckedCard1.card.rank;
    let shiftedWeight2 = deckedCard2.card.rank;
    if (deckedCard1.card.suit !== Card.Suit.Joker) {
      shiftedWeight1 = (shiftedWeight1 + 11) % 13;
      shiftedWeight2 = (shiftedWeight2 + 11) % 13;
    }
    return ShengjiUtils.compareNumber(shiftedWeight1, shiftedWeight2);
  }

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
      const dominantCard = shengjiGameState.dominantCard;
      if (dominantCard.suit === Card.Suit.Joker) {
        // 2) Dominant Card is Joker
        // Non-dominant Suit 1
        // Non-dominant Suit 2
        // Non-dominant Suit 3
        // Non-dominant Suit 4
        // Dominant Rank
        // Black Jokers
        // Red Jokers

        const isDominantCard1 = ShengjiUtils.isDominantCard(shengjiGameState, deckedCard1);
        const isDominantCard2 = ShengjiUtils.isDominantCard(shengjiGameState, deckedCard2);
        if (!isDominantCard1 && !isDominantCard2) {
          return ShengjiUtils.compareNonDominantCards(deckedCard1, deckedCard2);
        } else if (isDominantCard1 && !isDominantCard2) {
          return 1;
        } else if (!isDominantCard1 && isDominantCard2) {
          return -1;
        } else {
          ShengjiUtils.
        }
      }


      // 1) Normal
      // Non-dominant Suit 1
      // Non-dominant Suit 2
      // Non-dominant Suit 3
      // Dominant Suit
      // Non-dominant Suit, Dominant Rank
      // Dominant Suit, Dominant Rank
      // Black Jokers
      // Red Jokers




    };
  }

  static isDominantCard(shengjiGameState, deckedCard) {
    return ShengjiUtils.isJoker(deckedCard) ||
           ShengjiUtils.isDominantRank(shengjiGameState, deckedCard) ||
           ShengjiUtils.isDominantSuit(shengjiGameState, deckedCard);
  }

  static isDominantRank(shengjiGameState, deckedCard) {
    const currentRank = shengjiGameState.currentRank;
    const dominantCard = shengjiGameState.dominantCard;
    const card = deckedCard.card;
    return currentRank !== 14 &&
           dominantCard.suit !== Card.Suit.Joker &&
           card.suit !== Card.Suit.Joker &&
           dominantCard.rank === card.rank;
  }

  static isDominantSuit(shengjiGameState, deckedCard) {
    const currentRank = shengjiGameState.currentRank;
    const dominantCard = shengjiGameState.dominantCard;
    const card = deckedCard.card;
    return currentRank !== 14 &&
           dominantCard.suit !== Card.Suit.Joker &&
           card.suit !== Card.Suit.Joker &&
           dominantCard.suit === card.suit;
  }

  static isJoker(deckedCard) {
    return deckedCard.card.suit === Card.Suit.Joker;
  }
}