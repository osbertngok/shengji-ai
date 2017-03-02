'use strict';
const assert = require('chai').assert;

const ShengjiGame = require('../../../src/models/statemachines/shengjiGame');
const Players = require('../../../src/players/index');

const consolePlayer = new Players.ConsolePlayer();
const simpleAIPlayer = new Players.SimpleAIPlayer();

describe('load players process', () => {
    it('won\'t accept undefined', () => {
        const shengjiGame = new ShengjiGame();

        assert.throws(() => {
            shengjiGame.loadPlayers();
        }, 'ShengjiGame.loadPlayers accepts an array of players.');
    });

    it ('must be exactly 4 players', () => {
        const shengjiGame = new ShengjiGame();

        assert.throws(() => {
            shengjiGame.loadPlayers([
                new Players.ConsolePlayer(),
                new Players.ConsolePlayer(),
                new Players.ConsolePlayer()
            ]);
        }, 'ShengjiGame.loadPlayers accepts 4 players only.');

        assert.throws(() => {
            shengjiGame.loadPlayers([
                new Players.ConsolePlayer(),
                new Players.ConsolePlayer(),
                new Players.ConsolePlayer(),
                new Players.ConsolePlayer(),
                new Players.ConsolePlayer()
            ]);
        }, 'ShengjiGame.loadPlayers accepts 4 players only.');
    });
});