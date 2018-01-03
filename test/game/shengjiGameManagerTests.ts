'use strict';
import {assert} from 'chai';
import {ShengjiGameManager} from '../../src/game/shengjiGameManager';
import {ShengjiGameState} from '../../src/models/statemachines/shengjiGameState';
import * as Players from '../../src/players/index';

describe('initialize new game', () => {
  it('Check state is initialized', () => {
    const shengjiGameManager: ShengjiGameManager = new ShengjiGameManager();
    shengjiGameManager.loadPlayers([
      new Players.ConsolePlayer(),
      new Players.ConsolePlayer(),
      new Players.ConsolePlayer(),
      new Players.ConsolePlayer()
    ]);
    shengjiGameManager.initializeNewGame();
    const state: ShengjiGameState = shengjiGameManager.rootState.state;
    assert.strictEqual(2, state.currentRank);
    assert.strictEqual(2, state.currentRank);
    assert.strictEqual(2, state.currentRank);
    assert.strictEqual(2, state.currentRank);
    assert.strictEqual(2, state.team1Rank);
    assert.strictEqual(2, state.team2Rank);
    assert.strictEqual(1, state.dealerTeam);
    assert.strictEqual(0, state.dealer);
    assert.strictEqual(null, state.dominantCard);
    assert.strictEqual(4, state.noOfPlayers);
  });
});

describe('load players process', () => {
  // Won't compile in TypeScript
  /*
  it('won\'t accept undefined', () => {
    const shengjiGameManager: ShengjiGameManager = new ShengjiGameManager();

    assert.throws(() => {
      shengjiGameManager.loadPlayers(undefined);
    }, 'ShengjiGameManager.loadPlayers accepts an array of players.');
  });
  */

  it('must be exactly 4 players', () => {
    const shengjiGameManager: ShengjiGameManager = new ShengjiGameManager();

    assert.throws(() => {
      shengjiGameManager.loadPlayers([
        new Players.ConsolePlayer(),
        new Players.ConsolePlayer(),
        new Players.ConsolePlayer()
      ]);
    }, 'ShengjiGameManager.loadPlayers accepts 4 players only.');

    assert.throws(() => {
      shengjiGameManager.loadPlayers([
        new Players.ConsolePlayer(),
        new Players.ConsolePlayer(),
        new Players.ConsolePlayer(),
        new Players.ConsolePlayer(),
        new Players.ConsolePlayer()
      ]);
    }, 'ShengjiGameManager.loadPlayers accepts 4 players only.');
  });
});
