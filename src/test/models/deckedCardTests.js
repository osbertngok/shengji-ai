'use strict';
const assert = require('chai').assert;

const Card = require('../../models/card');

const DeckedCard = require('../../models/deckedCard');

describe('DeckedCard', () =>  {
  it('Cards should be singleton', () => {
    const card1 = new DeckedCard(1, Card.Suits.Club, 10);
    const card2 = new DeckedCard(1, Card.Suits.Club, 10);
    assert.strictEqual(card1, card2);
  });

  it('Different cards should be different', () => {
    const card1 = new DeckedCard(1, Card.Suits.Club, 10);
    const card2 = new DeckedCard(2, Card.Suits.Club, 10);
    const card3 = new DeckedCard(1, Card.Suits.Diamond, 10);
    const card4 = new DeckedCard(1, Card.Suits.Club, 11);
    assert.notStrictEqual(card1, card2);
    assert.notStrictEqual(card1, card3);
    assert.notStrictEqual(card1, card4);
  });
});