'use strict';
import {ShengjiErrorUtils} from '../../errors/shengjiErrorUtils';

// tslint:disable:object-literal-sort-keys
export const Suits = {
    Spade: 0,
    Heart: 1,
    Club: 2,
    Diamond: 3,
    Joker: 4
};
// tslint:enable:object-literal-sort-keys

const cardCollection = Array(54);

export class Card {

    private _suit: number;

    private _rank: number;

    constructor(suit, rank) {
        this.validate(suit, rank);
        return this.getOrCreate(suit, rank);
    }

    static getIndex(suit, rank) {
        return suit * 13 + rank - 1;
    }

    getIndex() {
        return Card.getIndex(this.suit, this.rank);
    }

    getOrCreate(suit, rank) {
        const index = Card.getIndex(suit, rank);
        const existingCard = cardCollection[index];
        if (existingCard) {
            return existingCard;
        } else {
            this._suit = suit;
            this._rank = rank;
            cardCollection[index] = this;
            Object.freeze(this);
            return this;
        }
    }

    toString() {
        if (this.suit === Suits.Joker) {
            switch (this.rank) {
                case 1:
                    return 'jr';
                case 2:
                    return 'JR';
                default:
                    throw ShengjiErrorUtils.invalidRank();
            }
        } else {
            let suitString;
            let rankString;
            switch (this.suit) {
                case Suits.Spade:
                    suitString = '♠';
                    break;
                case Suits.Heart:
                    suitString = '♥';
                    break;
                case Suits.Club:
                    suitString = '♣';
                    break;
                case Suits.Diamond:
                    suitString = '♦';
                    break;
                default:
                    throw ShengjiErrorUtils.invalidSuit();
            }
            switch (this.rank) {
                case 1:
                    rankString = 'A';
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    rankString = this.rank.toString();
                    break;
                case 11:
                    rankString = 'J';
                    break;
                case 12:
                    rankString = 'Q';
                    break;
                case 13:
                    rankString = 'K';
                    break;
                default:
                    throw ShengjiErrorUtils.invalidRank();
            }
            return `${suitString}${rankString}`;
        }
    }

    validate(suit, rank) {
        switch (suit) {
            case Suits.Spade:
            case Suits.Heart:
            case Suits.Club:
            case Suits.Diamond:
                if (typeof rank !== 'number' || !Number.isInteger(rank) || rank < 1 || rank > 13) {
                    throw ShengjiErrorUtils.invalidRank();
                }
                break;
            case Suits.Joker:
                if (typeof rank !== 'number' || !Number.isInteger(rank) || rank < 1 || rank > 2) {
                    throw ShengjiErrorUtils.invalidRank();
                }
                break;
            default:
                throw ShengjiErrorUtils.invalidSuit();
        }
    }

    get suit() {
        return this._suit;
    }

    get rank() {
        return this._rank;
    }
}
