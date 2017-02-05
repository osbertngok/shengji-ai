'use strict';
const assert = require('chai').assert;

const Card = require('../../src/models/card');
const DeckedCard = require('../../src/models/deckedCard');
const Pile = require('../../src/models/pile');
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

  it('Non dominant card vs. Dominant Rank', () => {
    const card1 = new DeckedCard(1, Card.Suits.Club, 10);
    const card2 = new DeckedCard(1, Card.Suits.Heart, 2);
    assert.equal(-1, comparisonFunc(card1, card2));
    assert.equal(1, comparisonFunc(card2, card1));
  });

  it ('Dominant Rank vs. Joker', () => {
    const card1 = new DeckedCard(1, Card.Suits.Club, 2);
    const card2 = new DeckedCard(1, Card.Suits.Joker, 2);
    assert.equal(-1, comparisonFunc(card1, card2));
    assert.equal(1, comparisonFunc(card2, card1));   
  })

  it('Dominant Rank, non-dominant suit vs. dominant suit', () => {
    const card1 = new DeckedCard(1, Card.Suits.Diamond, 2);
    const card2 = new DeckedCard(1, Card.Suits.Heart, 2);
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

  it('Ace Comparison', () => {
    const card1 = new DeckedCard(1, Card.Suits.Spade, 10);
    const card2 = new DeckedCard(1, Card.Suits.Spade, 1);
    assert.equal(-1, ShengjiUtils.compareSameSuitDeckedCards(card1, card2));
    assert.equal(1, ShengjiUtils.compareSameSuitDeckedCards(card2, card1));
  });

  it('Different Suit Comparison', () => {
    const card1 = new DeckedCard(2, Card.Suits.Spade, 10);
    const card2 = new DeckedCard(1, Card.Suits.Diamond, 10);
    assert.equal(-1, ShengjiUtils.compareNonDominantCards(card1, card2));
    assert.equal(1, ShengjiUtils.compareNonDominantCards(card2, card1));
  });

  it('sorting', () => {
    const pile = new Pile([
      new DeckedCard(1, Card.Suits.Diamond, 12),
      new DeckedCard(2, Card.Suits.Diamond, 1),
      new DeckedCard(2, Card.Suits.Diamond, 4),
      new DeckedCard(3, Card.Suits.Joker, 1),
      new DeckedCard(2, Card.Suits.Joker, 1),
      new DeckedCard(2, Card.Suits.Heart, 2),
      new DeckedCard(3, Card.Suits.Spade, 2),
      new DeckedCard(3, Card.Suits.Heart, 2),
      new DeckedCard(1, Card.Suits.Joker, 1),
      new DeckedCard(3, Card.Suits.Spade, 5),
      new DeckedCard(1, Card.Suits.Spade, 6),
      new DeckedCard(1, Card.Suits.Club, 7),
      new DeckedCard(1, Card.Suits.Club, 8),
      new DeckedCard(1, Card.Suits.Heart, 9)
    ]);
    pile.sort(ShengjiUtils.getDeckedCardSortFunc(shengjiGameState));
    [
      new DeckedCard(3, Card.Suits.Spade, 5),
      new DeckedCard(1, Card.Suits.Spade, 6),
      new DeckedCard(1, Card.Suits.Club, 7),
      new DeckedCard(1, Card.Suits.Club, 8),
      new DeckedCard(2, Card.Suits.Diamond, 4),
      new DeckedCard(1, Card.Suits.Diamond, 12),
      new DeckedCard(2, Card.Suits.Diamond, 1),
      new DeckedCard(1, Card.Suits.Heart, 9),
      new DeckedCard(3, Card.Suits.Spade, 2),
      new DeckedCard(2, Card.Suits.Heart, 2),
      new DeckedCard(3, Card.Suits.Heart, 2),
      new DeckedCard(1, Card.Suits.Joker, 1),
      new DeckedCard(2, Card.Suits.Joker, 1),
      new DeckedCard(3, Card.Suits.Joker, 1)      
    ].forEach(deckedCard => {
      assert.strictEqual(deckedCard, pile.dealCard())
    });
  })
});