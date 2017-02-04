'use strict';
const assert = require('chai').assert;

const Card = require('../../models/card');

const DeckedCard = require('../../models/deckedCard');

const Deck = require('../../models/deck');

describe('Pile', () => {
  it('A Deck to pile has count 54', () => {
    const pile = new Deck(1).toPile();
    assert.equal(54, pile.length);
  });
});