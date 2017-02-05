'use strict';
const assert = require('chai').assert;

const Card = require('../../src/models/card');

const DeckedCard = require('../../src/models/deckedCard');

const ShengjiGameState = require('../../src/models/shengjiGameState');

const ShengjiUtils = require('../../src/utils/shengjiUtils');

describe('Heart 2 Dominant Card Comparison', () =>  {
  const shengjiGameState = new ShengjiGameState({
    'dominantCard': new Card(Card.Suits.Heart, 2),
    'dealerTeam': 1
  });
  const comparisonFunc = ShengjiUtils.getDeckedCardSortFunc(shengjiGameState);
  it('Non dominant card vs. Joker', () => {
    const card1 = new DeckedCard(1, Card.Suits.Club, 10);
    const card2 = new DeckedCard(1, Card.Suits.Joker, 1);
    assert.equal(-1, comparisonFunc(card1, card2));
    assert.equal(1, comparisonFunc(card2, card1));
  });

  it('Compare 2 Joker cards', () => {
    const card1 = new DeckedCard(2, Card.Suits.Joker, 1);
    const card2 = new DeckedCard(1, Card.Suits.Joker, 2);
    const card3 = new DeckedCard(2, Card.Suits.Joker, 1);
    assert.equal(-1, ShengjiUtils.compareJokerCards(card1, card2));
    assert.equal(1, ShengjiUtils.compareJokerCards(card2, card1));
    assert.equal(0, ShengjiUtils.compareJokerCards(card1, card3));
  });

  it('Same Suit Comparison', () => {
    const card1 = new DeckedCard(1, Card.Suits.Spade, 10);
    const card2 = new DeckedCard(1, Card.Suits.Spade, 11);
    assert.equal(-1, ShengjiUtils.compareSameSuitDeckedCards(card1, card2));
    assert.equal(1, ShengjiUtils.compareSameSuitDeckedCards(card2, card1));
  });

  it('Different Suit Comparison', () => {
    const card1 = new DeckedCard(2, Card.Suits.Spade, 10);
    const card2 = new DeckedCard(1, Card.Suits.Diamond, 10);
    assert.equal(-1, ShengjiUtils.compareNonDominantCards(card1, card2));
    assert.equal(1, ShengjiUtils.compareNonDominantCards(card2, card1));
  });
});