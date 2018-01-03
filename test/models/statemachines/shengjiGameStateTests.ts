'use strict';
import {assert} from 'chai';
// import {Card, Suits} from '../../../src/models/cards/card';
// import {ShengjiGameState} from '../../../src/models/statemachines/shengjiGameState';
// import {GameStatuses as ShengjiGameStateStatuses} from '../../../src/models/statemachines/shengjiGameStateStatus';

describe('GameState Immutability', () => {

    // Ignore; won't compile
    /*
    it('Getter Only', () => {
        const shengjiGameState = new ShengjiGameState({
          dealer: 1,
            dealerTeam: 1,
            dominantCard: new Card(Suits.Heart, 2),
          status: ShengjiGameStateStatuses.GameCreated,
          team1Rank: 2,
          team2Rank: 2
        });
        assert.throws(() => {
            shengjiGameState.dominantCard = new Card(Suits.Diamond, 2);
        }, 'Cannot set property dominantCard of #<ShengjiGameState> which has only a getter');
    });

    it('Frozen', () => {
        const shengjiGameState = new ShengjiGameState({
          dealer: 1,
          dealerTeam: 1,
          dominantCard: new Card(Suits.Heart, 2),
          status: ShengjiGameStateStatuses.GameCreated,
          team1Rank: 2,
          team2Rank: 2
        });
        assert.throws(() => {
            shengjiGameState._dominantCard = new Card(Suits.Diamond, 2);
        }, 'Cannot assign to read only property \'_dominantCard\' of object \'#<ShengjiGameState>\'');
    });
    */

});
