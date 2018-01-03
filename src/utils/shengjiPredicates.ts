'use strict';

import {Card, Suits} from '../models/cards/card';

export class ShengjiPredicates {
    /*
     Type: (ShengjiGameState, DeckedCard) => bool
     */
    static isDominantCard(shengjiGameState, deckedCard) {
        return ShengjiPredicates.isJoker(deckedCard) ||
            ShengjiPredicates.isDominantRank(shengjiGameState, deckedCard) ||
            ShengjiPredicates.isDominantSuit(shengjiGameState, deckedCard);
    }

    /*
     Type: (ShengjiGameState, DeckedCard) => bool
     */
    static isDominantRank(shengjiGameState, deckedCard) {
        const currentRank = shengjiGameState.currentRank;
        const dominantCard = shengjiGameState.dominantCard;
        const card = deckedCard.card;
        return currentRank !== 14 &&
            dominantCard.suit !== Suits.Joker &&
            card.suit !== Suits.Joker &&
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
            dominantCard.suit !== Suits.Joker &&
            card.suit !== Suits.Joker &&
            dominantCard.suit === card.suit;
    }

    /*
     Type: (DeckedCard) => bool
     */
    static isJoker(deckedCard) {
        return deckedCard.card.suit === Suits.Joker;
    }
}
