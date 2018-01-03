'use strict';
import {assert} from 'chai';
import {Card, Suits} from '../../../src/models/cards/card';
import {Deck} from '../../../src/models/cards/deck';
import {DeckedCard} from '../../../src/models/cards/deckedCard';
import {Pile} from '../../../src/models/cards/pile';
import {ShengjiGameState} from '../../../src/models/statemachines/shengjiGameState';
import * as ShengjiUtils from '../../../src/utils/shengjiUtils';

describe('Pile', () => {
    it('A Deck to pile has count 54', () => {
        const pile = new Deck(1).toPile();
        assert.equal(54, pile.length);
    });

    it('Pretty Print', () => {
        const shengjiGameState = new ShengjiGameState({
            dominantCard: new Card(Suits.Heart, 2),
            dealerTeam: 1
        });
        const pile = new Pile([
            new DeckedCard(1, Suits.Spade, 1),
            new DeckedCard(3, Suits.Heart, 2),
            new DeckedCard(1, Suits.Heart, 3),
            new DeckedCard(1, Suits.Diamond, 5),
            new DeckedCard(1, Suits.Club, 6),
            new DeckedCard(1, Suits.Club, 7),
            new DeckedCard(1, Suits.Diamond, 10),
            new DeckedCard(1, Suits.Heart, 13),
            new DeckedCard(2, Suits.Spade, 12),
            new DeckedCard(1, Suits.Spade, 12),
            new DeckedCard(1, Suits.Club, 11),
            new DeckedCard(1, Suits.Diamond, 9),
            new DeckedCard(1, Suits.Spade, 3),
            new DeckedCard(3, Suits.Heart, 5),
            new DeckedCard(1, Suits.Spade, 2),
            new DeckedCard(1, Suits.Heart, 7),
            new DeckedCard(1, Suits.Heart, 5),
            new DeckedCard(1, Suits.Heart, 4),
            new DeckedCard(1, Suits.Club, 3),
            new DeckedCard(1, Suits.Heart, 6),
            new DeckedCard(1, Suits.Joker, 2),
            new DeckedCard(1, Suits.Heart, 2),
            new DeckedCard(1, Suits.Joker, 1),
            new DeckedCard(2, Suits.Club, 6),
            new DeckedCard(3, Suits.Club, 7)
        ]);
        const prettyPrintResult = pile.prettyPrint(ShengjiUtils.compare.getDeckedCardSortFunc(shengjiGameState));
        assert.strictEqual('♠3 ♠Q ♠Q ♠A ♣3 ♣6 ♣6 ♣7 ♣7 ♣J ♦5 ♦9 ♦10 ♥3 ♥4 ♥5 ♥5 ♥6 ♥7 ♥K ♠2 ♥2 ♥2 jr JR', prettyPrintResult);
    });
});
