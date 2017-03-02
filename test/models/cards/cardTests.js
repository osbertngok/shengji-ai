'use strict';
const assert = require('chai').assert;

const Card = require('../../../src/models/cards/card');

describe('Suits', () => {
    it('Spade is 0', () => {
        assert.strictEqual(0, Card.Suits.Spade);
    });
    it('Heart is 1', () => {
        assert.strictEqual(1, Card.Suits.Heart);
    });
    it('Club is 2', () => {
        assert.strictEqual(2, Card.Suits.Club);
    });
    it('Diamond is 3', () => {
        assert.strictEqual(3, Card.Suits.Diamond);
    });
    it('Joker is 4', () => {
        assert.strictEqual(4, Card.Suits.Joker);
    });
});

describe('Card', () => {
    it('Invalid Suit', () => {
        assert.throws(() => {
            const card1 = new Card(5, 1);
        });
    });

    it('Invalid Rank', () => {
        assert.throws(() => {
            const card1 = new Card(Cards.Suits.Club, 14);
        });
        assert.throws(() => {
            const card1 = new Card(Cards.Suits.Joker, 3);
        });
    });

    it('Cards should be singleton', () => {
        const card1 = new Card(Card.Suits.Spade, 5);
        const card2 = new Card(Card.Suits.Spade, 5);
        assert.strictEqual(card1, card2);
    });

    it('Different Cards should be different', () => {
        const card1 = new Card(Card.Suits.Spade, 5);
        const card2 = new Card(Card.Suits.Heart, 5);
        assert.notStrictEqual(card1, card2);
    });

    it('Heart 5 should be of index 18', () => {
        const index = Card.getIndex(Card.Suits.Heart, 5);
        assert.equal(17, index);
    });

    it('Immutability Getter', () => {
        const card = new Card(Card.Suits.Spade, 5);
        assert.throws(() => {
            card.suit = Card.Suits.Joker;
        })
    });

    it('Immutability Frozen', () => {
        const card = new Card(Card.Suits.Spade, 5);
        assert.throws(() => {
            card._suit = Card.Suits.Joker;
        })
    });

    it('ToString', () => {
        assert.strictEqual('♦A', (new Card(Card.Suits.Diamond, 1)).toString());
        assert.strictEqual('♥10', (new Card(Card.Suits.Heart, 10)).toString());
        assert.strictEqual('♠J', (new Card(Card.Suits.Spade, 11)).toString());
        assert.strictEqual('♣Q', (new Card(Card.Suits.Club, 12)).toString());
        assert.strictEqual('♦K', (new Card(Card.Suits.Diamond, 13)).toString());
        assert.strictEqual('jr', (new Card(Card.Suits.Joker, 1)).toString());
        assert.strictEqual('JR', (new Card(Card.Suits.Joker, 2)).toString());
    });
});
