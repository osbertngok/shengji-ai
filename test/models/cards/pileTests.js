'use strict';
const assert = require('chai').assert;

const Card = require('../../../src/models/cards/card');
const DeckedCard = require('../../../src/models/cards/deckedCard');
const Deck = require('../../../src/models/cards/deck');
const Pile = require('../../../src/models/cards/pile');
const ShengjiGameState = require('../../../src/models/statemachines/shengjiGameState');
const ShengjiUtils = require('../../../src/utils/shengjiUtils');

describe('Pile', () => {
  it('A Deck to pile has count 54', () => {
    const pile = new Deck(1).toPile();
    assert.equal(54, pile.length);
  });

  it('Pretty Print', () => {
    const shengjiGameState = new ShengjiGameState({
      'dominantCard': new Card(Card.Suits.Heart, 2),
      'dealerTeam': 1
    });
    const pile = new Pile([
      new DeckedCard(1, Card.Suits.Spade, 1),
      new DeckedCard(3, Card.Suits.Heart, 2),
      new DeckedCard(1, Card.Suits.Heart, 3),
      new DeckedCard(1, Card.Suits.Diamond, 5),
      new DeckedCard(1, Card.Suits.Club, 6),
      new DeckedCard(1, Card.Suits.Club, 7),
      new DeckedCard(1, Card.Suits.Diamond, 10),
      new DeckedCard(1, Card.Suits.Heart, 13),
      new DeckedCard(2, Card.Suits.Spade, 12),
      new DeckedCard(1, Card.Suits.Spade, 12),
      new DeckedCard(1, Card.Suits.Club, 11),
      new DeckedCard(1, Card.Suits.Diamond, 9),
      new DeckedCard(1, Card.Suits.Spade, 3),
      new DeckedCard(3, Card.Suits.Heart, 5),
      new DeckedCard(1, Card.Suits.Spade, 2),
      new DeckedCard(1, Card.Suits.Heart, 7),
      new DeckedCard(1, Card.Suits.Heart, 5),
      new DeckedCard(1, Card.Suits.Heart, 4),
      new DeckedCard(1, Card.Suits.Club, 3),
      new DeckedCard(1, Card.Suits.Heart, 6),
      new DeckedCard(1, Card.Suits.Joker, 2),
      new DeckedCard(1, Card.Suits.Heart, 2),
      new DeckedCard(1, Card.Suits.Joker, 1),
      new DeckedCard(2, Card.Suits.Club, 6),
      new DeckedCard(3, Card.Suits.Club, 7)
    ]);
    const prettyPrintResult = pile.prettyPrint(ShengjiUtils.compare.getDeckedCardSortFunc(shengjiGameState));
    assert.strictEqual('♠3 ♠Q ♠Q ♠A ♣3 ♣6 ♣6 ♣7 ♣7 ♣J ♦5 ♦9 ♦10 ♥3 ♥4 ♥5 ♥5 ♥6 ♥7 ♥K ♠2 ♥2 ♥2 jr JR', prettyPrintResult);
  });
});