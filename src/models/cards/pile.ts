'use strict';
import {ShengjiErrorUtils} from '../../errors/shengjiErrorUtils';
import {DeckedCard} from './deckedCard';

export class Pile {

    private _deckedCards: DeckedCard[];
    constructor(arrayOfDeckedCards: DeckedCard[]) {
        if (arrayOfDeckedCards === undefined) {
            this._deckedCards = [];
        }

        this._deckedCards = Array.from(arrayOfDeckedCards);
        return this;
    }

    addCard(deckedCard) {
        this._deckedCards.push(deckedCard);
    }

    clone() {
        return new Pile(this.deckedCards);
    }

    dealCard(): DeckedCard {
        const card: DeckedCard | undefined = this._deckedCards.shift();
        if (card === undefined) {
            throw new Error('no card to deal');
        } else {
          return card;
        }
    }

    prettyPrint(shengjiGameState) {
        const pileForPrettyPrint = this.clone();
        pileForPrettyPrint.sort(shengjiGameState);
        return pileForPrettyPrint.deckedCards
            .map(deckedCard => deckedCard.card.toString())
            .join(' ');
    }

    shuffle() {
        let remainExchanges = this._deckedCards.length;
        while (remainExchanges) {
            const randomIndex = Math.floor(Math.random() * remainExchanges);
            remainExchanges--;

            const tmp = this._deckedCards[randomIndex];
            this._deckedCards[randomIndex] = this._deckedCards[remainExchanges];
            this._deckedCards[remainExchanges] = tmp;
        }
    }

    sort(func) {
        if (func === undefined) {
            this.deckedCards.sort(DeckedCard.compareTo);
        } else if (typeof func !== 'function') {
            throw ShengjiErrorUtils.invalidSortFunction();
        } else {
            this.deckedCards.sort(func);
        }
    }

    get deckedCards() {
        return this._deckedCards;
    }

    get length() {
        if (!this._deckedCards) {
            return 0;
        }

        return this._deckedCards.length;
    }
}
