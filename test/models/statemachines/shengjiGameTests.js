'use strict';
const assert = require('chai').assert;

const ShengjiGameManager = require('../../../src/game/shengjiGameManager');
const Players = require('../../../src/players/index');

const consolePlayer = new Players.ConsolePlayer();
const simpleAIPlayer = new Players.SimpleAIPlayer();

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