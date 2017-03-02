'use strict';
const Pile = require('./pile');

class ImmutablePile {
    constructor(arrayOfDeckedCards) {
        if (arrayOfDeckedCards === undefined) {
            this._deckedCards = [];
        }

        this._deckedCards = Array.from(arrayOfDeckedCards);
        Object.freeze(this._deckedCards);
        Object.freeze(this);
        return this;
    }

    static toImmutablePile(pile) {
        return new ImmutablePile(pile.deckedCards);
    }

    pileClone() {
        return new Pile(this._deckedCards);
    }

    prettyPrint(shengjiGameState) {
        const pileForPrettyPrint = this.clone();
        pileForPrettyPrint.sort(shengjiGameState);
        return pileForPrettyPrint.deckedCards
            .map(deckedCard => deckedCard.card.toString())
            .join(' ');
    }

    get deckedCards() {
        return Array.from(this._deckedCards);
    }

    get length() {
        if (!this._deckedCards) {
            return 0;
        }

        return this._deckedCards.length;
    }
}

module.exports = ImmutablePile;