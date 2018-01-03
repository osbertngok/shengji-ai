'use strict';
import {assert} from 'chai';

import {Card, Suits} from '../../../src/models/cards/card';

describe('Suits', () => {
  it('Spade is 0', () => {
    assert.strictEqual(0, Suits.Spade);
  });
  it('Heart is 1', () => {
    assert.strictEqual(1, Suits.Heart);
  });
  it('Club is 2', () => {
    assert.strictEqual(2, Suits.Club);
  });
  it('Diamond is 3', () => {
    assert.strictEqual(3, Suits.Diamond);
  });
  it('Joker is 4', () => {
    assert.strictEqual(4, Suits.Joker);
  });
});

describe('Card', () => {
  it('Invalid Suit', () => {
    assert.throws(() => {
      const card1 = new Card(5, 1);
    }, 'Invalid Suit');
  });

  it('Invalid Rank', () => {
    assert.throws(() => {
      const card1 = new Card(Suits.Club, 14);
    }, 'Invalid Rank');
    assert.throws(() => {
      const card1 = new Card(Suits.Joker, 3);
    }, 'Invalid Rank');
  });

  it('Cards should be singleton', () => {
    const card1 = new Card(Suits.Spade, 5);
    const card2 = new Card(Suits.Spade, 5);
    assert.strictEqual(card1, card2);
  });

  it('Different Cards should be different', () => {
    const card1 = new Card(Suits.Spade, 5);
    const card2 = new Card(Suits.Heart, 5);
    assert.notStrictEqual(card1, card2);
  });

  it('Heart 5 should be of index 18', () => {
    const index = Card.getIndex(Suits.Heart, 5);
    assert.equal(17, index);
  });

  // won't compile in TypeScript; ignore
  /*
  it('Immutability Getter', () => {
      const card = new Card(Suits.Spade, 5);
      assert.throws(() => {
          card.suit = Suits.Joker;
      }, 'Cannot set property suit of [object Object] which has only a getter');
  });

  it('Immutability Frozen', () => {
      const card = new Card(Suits.Spade, 5);
      assert.throws(() => {
          card._suit = Suits.Joker;
      }, 'Cannot assign to read only property \'_suit\' of object \'[object Object]\'');
  });
  */

  it('ToString', () => {
    assert.strictEqual('♦A', (new Card(Suits.Diamond, 1)).toString());
    assert.strictEqual('♥10', (new Card(Suits.Heart, 10)).toString());
    assert.strictEqual('♠J', (new Card(Suits.Spade, 11)).toString());
    assert.strictEqual('♣Q', (new Card(Suits.Club, 12)).toString());
    assert.strictEqual('♦K', (new Card(Suits.Diamond, 13)).toString());
    assert.strictEqual('jr', (new Card(Suits.Joker, 1)).toString());
    assert.strictEqual('JR', (new Card(Suits.Joker, 2)).toString());
  });
});
