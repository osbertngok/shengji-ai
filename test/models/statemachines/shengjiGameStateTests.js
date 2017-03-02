'use strict';
const assert = require('chai').assert;
const Card = require('../../../src/models/cards/card');
const ShengjiGameState = require('../../../src/models/statemachines/shengjiGameState');

describe('GameState Immutability', () =>  {

  it('Getter Only', () => {
    const shengjiGameState = new ShengjiGameState({
      'dominantCard': new Card(Card.Suits.Heart, 2),
      'dealerTeam': 1
    });
    assert.throws(() => {
      shengjiGameState.dominantCard = new Card(Card.Suits.Diamond, 2);
    }, 'Cannot set property dominantCard of #<ShengjiGameState> which has only a getter');
  });

  it('Frozen', () => {
    const shengjiGameState = new ShengjiGameState({
      'dominantCard': new Card(Card.Suits.Heart, 2),
      'dealerTeam': 1
    });
    assert.throws(() => {
      shengjiGameState._dominantCard = new Card(Card.Suits.Diamond, 2);
    }, 'Cannot assign to read only property \'_dominantCard\' of #<ShengjiGameState>');
  });

  
});