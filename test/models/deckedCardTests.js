'use strict';
const assert = require('chai').assert;

const Card = require('../../src/models/card');

const DeckedCard = require('../../src/models/deckedCard');

describe('DeckedCard', () =>  {
  it('DeckedCard constructor', () => {
    const card1 = new DeckedCard(1, Card.Suits.Club, 10);
    const card2 = new DeckedCard(2, Card.Suits.Joker, 2);
    assert.strictEqual(1, card1.deckNo);
    assert.strictEqual(Card.Suits.Club, card1.card.suit);
    assert.strictEqual(10, card1.card.rank);

    assert.strictEqual(2, card2.deckNo);
    assert.strictEqual(Card.Suits.Joker, card2.card.suit);
    assert.strictEqual(2, card2.card.rank);
  });

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

  it('Decked Cards comparison', () => {
    const card1 = new DeckedCard(1, Card.Suits.Spade, 1);
    const card2 = new DeckedCard(2, Card.Suits.Spade, 1);
    const card3 = new DeckedCard(1, Card.Suits.Club, 7);
    const card4 = new DeckedCard(1, Card.Suits.Club, 7);
    const card5 = new DeckedCard(1, Card.Suits.Joker, 2);
    assert.equal(-1, DeckedCard.compareTo(card1, card2));
    assert.equal(1, DeckedCard.compareTo(card2, card1));
    assert.equal(-1, DeckedCard.compareTo(card2, card3));
    assert.equal(1, DeckedCard.compareTo(card3, card2));
    assert.equal(0, DeckedCard.compareTo(card3, card4));
    assert.equal(0, DeckedCard.compareTo(card4, card3));
    assert.equal(-1, DeckedCard.compareTo(card4, card5));
    assert.equal(1, DeckedCard.compareTo(card5, card4));
  });
});