'use strict';
import {assert} from 'chai';
import {Card, Suits} from '../../src/models/cards/card';
import {DeckedCard} from '../../src/models/cards/deckedCard';
import {Pile} from '../../src/models/cards/pile';
import {ShengjiGameState} from '../../src/models/statemachines/shengjiGameState';
import * as ShengjiUtils from '../../src/utils/shengjiUtils';

describe('Heart 2 Dominant Card Comparison', () => {
    const shengjiGameState = new ShengjiGameState({
        'dominantCard': new Card(Suits.Heart, 2),
        'dealerTeam': 1
    });
    const comparisonFunc = ShengjiUtils.compare.getDeckedCardSortFunc(shengjiGameState);

    it('Non dominant card vs. Joker', () => {
        const card1 = new DeckedCard(1, Suits.Club, 10);
        const card2 = new DeckedCard(1, Suits.Joker, 1);
        assert.equal(-1, comparisonFunc(card1, card2));
        assert.equal(1, comparisonFunc(card2, card1));
    });

    it('Non dominant card vs. Dominant Rank', () => {
        const card1 = new DeckedCard(1, Suits.Club, 10);
        const card2 = new DeckedCard(1, Suits.Heart, 2);
        assert.equal(-1, comparisonFunc(card1, card2));
        assert.equal(1, comparisonFunc(card2, card1));
    });

    it('Dominant Rank vs. Joker', () => {
        const card1 = new DeckedCard(1, Suits.Club, 2);
        const card2 = new DeckedCard(1, Suits.Joker, 2);
        assert.equal(-1, comparisonFunc(card1, card2));
        assert.equal(1, comparisonFunc(card2, card1));
    })

    it('Dominant Rank, non-dominant suit vs. dominant suit', () => {
        const card1 = new DeckedCard(1, Suits.Diamond, 2);
        const card2 = new DeckedCard(1, Suits.Heart, 2);
        assert.equal(-1, comparisonFunc(card1, card2));
        assert.equal(1, comparisonFunc(card2, card1));
    });

    it('Compare 2 Joker cards', () => {
        const card1 = new DeckedCard(2, Suits.Joker, 1);
        const card2 = new DeckedCard(1, Suits.Joker, 2);
        const card3 = new DeckedCard(2, Suits.Joker, 1);
        assert.equal(-1, ShengjiUtils.compare.compareJokerCards(card1, card2));
        assert.equal(1, ShengjiUtils.compare.compareJokerCards(card2, card1));
        assert.equal(0, ShengjiUtils.compare.compareJokerCards(card1, card3));
    });

    it('Same Suit Comparison', () => {
        const card1 = new DeckedCard(1, Suits.Spade, 10);
        const card2 = new DeckedCard(1, Suits.Spade, 11);
        assert.equal(-1, ShengjiUtils.compare.compareSameSuitDeckedCards(card1, card2));
        assert.equal(1, ShengjiUtils.compare.compareSameSuitDeckedCards(card2, card1));
    });

    it('Ace Comparison', () => {
        const card1 = new DeckedCard(1, Suits.Spade, 10);
        const card2 = new DeckedCard(1, Suits.Spade, 1);
        assert.equal(-1, ShengjiUtils.compare.compareSameSuitDeckedCards(card1, card2));
        assert.equal(1, ShengjiUtils.compare.compareSameSuitDeckedCards(card2, card1));
    });

    it('Different Suit Comparison', () => {
        const card1 = new DeckedCard(2, Suits.Spade, 10);
        const card2 = new DeckedCard(1, Suits.Diamond, 10);
        assert.equal(-1, ShengjiUtils.compare.compareNonDominantCards(card1, card2));
        assert.equal(1, ShengjiUtils.compare.compareNonDominantCards(card2, card1));
    });

    it('sorting', () => {
        const pile = new Pile([
            new DeckedCard(1, Suits.Diamond, 12),
            new DeckedCard(2, Suits.Diamond, 1),
            new DeckedCard(2, Suits.Diamond, 4),
            new DeckedCard(3, Suits.Joker, 1),
            new DeckedCard(2, Suits.Joker, 1),
            new DeckedCard(2, Suits.Heart, 2),
            new DeckedCard(3, Suits.Spade, 2),
            new DeckedCard(3, Suits.Heart, 2),
            new DeckedCard(1, Suits.Joker, 1),
            new DeckedCard(3, Suits.Spade, 5),
            new DeckedCard(1, Suits.Spade, 6),
            new DeckedCard(1, Suits.Club, 7),
            new DeckedCard(1, Suits.Club, 8),
            new DeckedCard(1, Suits.Heart, 9)
        ]);
        pile.sort(ShengjiUtils.compare.getDeckedCardSortFunc(shengjiGameState));
        [
            new DeckedCard(3, Suits.Spade, 5),
            new DeckedCard(1, Suits.Spade, 6),
            new DeckedCard(1, Suits.Club, 7),
            new DeckedCard(1, Suits.Club, 8),
            new DeckedCard(2, Suits.Diamond, 4),
            new DeckedCard(1, Suits.Diamond, 12),
            new DeckedCard(2, Suits.Diamond, 1),
            new DeckedCard(1, Suits.Heart, 9),
            new DeckedCard(3, Suits.Spade, 2),
            new DeckedCard(2, Suits.Heart, 2),
            new DeckedCard(3, Suits.Heart, 2),
            new DeckedCard(1, Suits.Joker, 1),
            new DeckedCard(2, Suits.Joker, 1),
            new DeckedCard(3, Suits.Joker, 1)
        ].forEach(deckedCard => {
            assert.strictEqual(deckedCard, pile.dealCard())
        });
    })
});