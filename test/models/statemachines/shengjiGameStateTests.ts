'use strict';
import {assert} from 'chai';
import {Card, Suits} from '../../../src/models/cards/card';
import {ShengjiGameState} from '../../../src/models/statemachines/shengjiGameState';

describe('GameState Immutability', () => {

    it('Getter Only', () => {
        const shengjiGameState = new ShengjiGameState({
            'dominantCard': new Card(Suits.Heart, 2),
            'dealerTeam': 1
        });
        assert.throws(() => {
            shengjiGameState.dominantCard = new Card(Suits.Diamond, 2);
        }, 'Cannot set property dominantCard of #<ShengjiGameState> which has only a getter');
    });

    it('Frozen', () => {
        const shengjiGameState = new ShengjiGameState({
            'dominantCard': new Card(Suits.Heart, 2),
            'dealerTeam': 1
        });
        assert.throws(() => {
            shengjiGameState._dominantCard = new Card(Suits.Diamond, 2);
        }, 'Cannot assign to read only property \'_dominantCard\' of object \'#<ShengjiGameState>\'');
    });


});