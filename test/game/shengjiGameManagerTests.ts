'use strict';
const ShengjiGameManager = require('../../src/game/shengjiGameManager');
const assert = require('chai').assert;
const Players = require('../../src/players/index');

describe('initialize new game', () => {
    it('Check state is initialized', () => {
        const shengjiGameManager = new ShengjiGameManager();
        shengjiGameManager.loadPlayers([
            new Players.ConsolePlayer(),
            new Players.ConsolePlayer(),
            new Players.ConsolePlayer(),
            new Players.ConsolePlayer()
        ]);
        shengjiGameManager.initializeNewGame();
        const state = shengjiGameManager.rootState.state;
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
    it('won\'t accept undefined', () => {
        const shengjiGameManager = new ShengjiGameManager();

        assert.throws(() => {
            shengjiGameManager.loadPlayers();
        }, 'ShengjiGameManager.loadPlayers accepts an array of players.');
    });

    it('must be exactly 4 players', () => {
        const shengjiGameManager = new ShengjiGameManager();

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

describe('deal cards', () => {
    it('', () => {
        const shengjiGameManager = new ShengjiGameManager();

        assert.throws(() => {
            shengjiGameManager.loadPlayers();
        }, 'ShengjiGameManager.loadPlayers accepts an array of players.');
    });
});