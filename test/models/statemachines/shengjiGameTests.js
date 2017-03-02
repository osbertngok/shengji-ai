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
});