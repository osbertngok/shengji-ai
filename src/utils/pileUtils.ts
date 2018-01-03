/**
 * Created by osbertngok on 2/3/2017.
 */
'use strict';
import {DeckedCard} from '../models/cards/deckedCard';
import {Pile} from '../models/cards/pile';

export const intersection = (pile1, pile2) => {
    const sortedPile1 = pile1.clone();
    const sortedPile2 = pile2.clone();
    sortedPile1.sort();
    sortedPile2.sort();
    const sortedDeckedCards1 = sortedPile1.deckedCards;
    const sortedDeckedCards2 = sortedPile2.deckedCards;
    let pointer1 = 0;
    let pointer2 = 0;
    const unionDeckedCards: DeckedCard[] = [];
    while (pointer1 < sortedDeckedCards1.length && pointer2 < sortedDeckedCards2.length) {
        const deckedCard1 = sortedDeckedCards1[pointer1];
        const deckedCard2 = sortedDeckedCards2[pointer2];
        const compareResult = DeckedCard.compareTo(deckedCard1, deckedCard2);
        if (compareResult === 0) {
            unionDeckedCards.push(deckedCard1);
            pointer1++;
            pointer2++;
        } else if (compareResult === -1) {
            pointer1++;
        } else {
            pointer2++;
        }
    }
    return new Pile(unionDeckedCards);
};

export const concat = (...piles: Pile[]): Pile => {
    if (piles.length === 0) {
        return new Pile([]);
    }
    if (piles.length === 1) {
        return piles[0];
    }
    // Compile first two, and return the rest
    if (!intersection(piles[0], piles[1]).length) {
        return new Pile([...piles[0].deckedCards, ...piles[1].deckedCards]);
    }
    return new Pile([]);
};
