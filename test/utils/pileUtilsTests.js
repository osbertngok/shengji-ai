/**
 * Created by osbertngok on 2/3/2017.
 */
'use strict';
const assert = require('chai').assert;

const Card = require('../../src/models/cards/card');
const DeckedCard = require('../../src/models/cards/deckedCard');
const Pile = require('../../src/models/cards/pile');
const PileUtils = require('../../src/utils/pileUtils');

describe('Intersection Test', () => {
    it('1 intersection', () => {
        const pile1 = new Pile([
            new DeckedCard(1, Card.Suits.Diamond, 12),
            new DeckedCard(2, Card.Suits.Diamond, 1),
            new DeckedCard(2, Card.Suits.Diamond, 4),
            new DeckedCard(2, Card.Suits.Heart, 2),
            new DeckedCard(3, Card.Suits.Spade, 2),
            new DeckedCard(1, Card.Suits.Joker, 1),
            new DeckedCard(3, Card.Suits.Spade, 5),
            new DeckedCard(1, Card.Suits.Spade, 6),
            new DeckedCard(1, Card.Suits.Club, 7),
            new DeckedCard(1, Card.Suits.Club, 8),
            new DeckedCard(1, Card.Suits.Heart, 9)
        ]);

        const pile2 = new Pile([
            new DeckedCard(2, Card.Suits.Diamond, 12),
            new DeckedCard(2, Card.Suits.Diamond, 1),
            new DeckedCard(3, Card.Suits.Diamond, 4),
            new DeckedCard(3, Card.Suits.Heart, 2),
            new DeckedCard(1, Card.Suits.Spade, 2),
            new DeckedCard(2, Card.Suits.Joker, 1),
            new DeckedCard(1, Card.Suits.Spade, 5),
            new DeckedCard(2, Card.Suits.Spade, 6),
            new DeckedCard(2, Card.Suits.Club, 7),
            new DeckedCard(2, Card.Suits.Club, 8),
            new DeckedCard(2, Card.Suits.Heart, 9)
        ]);

        const intersectionPile = PileUtils.intersection(pile1, pile2);
        assert.strictEqual(1, intersectionPile.length);
        assert.strictEqual(new DeckedCard(2, Card.Suits.Diamond, 1), intersectionPile.deckedCards[0]);
    });
});

