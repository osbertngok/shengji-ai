/**
 * Created by osbertngok on 27/2/2017.
 */
'use strict';

const redux = require('redux');

const ShengjiErrorUtils = require('./../errors/shengjiErrorUtils');

const ShengjiGameRootState = require('./shengjiGameRootState');

const Players = require('../../players/index');


const RoundActions = {
    'InitializeNewRound'   : 0
};

class ShengjiGame {
    constructor() {
        this.store = redux.createStore(ShengjiGameRootState.reducer);
    }

    initializeNewRound() {
        this.store.dispatch({
           'action': RoundActions.InitializeNewRound
        });
    }

    loadPlayers(players) {
        // Assert players are array of valid players
        if (!Array.isArray(players)) {
            throw ShengjiErrorUtils.invalidPlayer('ShengjiGame.loadPlayers accepts an array of players.');
        }

        // Currently only support 4 players
        if (players.length !== 4) {
            throw ShengjiErrorUtils.invalidPlayer('ShengjiGame.loadPlayers accepts 4 players only.');
        }

        // Validate per player
        for (let playerIndex = 0; playerIndex < players.length; ++playerIndex) {
            const player = players[playerIndex];
            try {
                Players.validatePlayer(player);
            }
            catch(ex) {
                throw ShengjiErrorUtils.invalidPlayer(`Player ${playerIndex}: ${ex.message}`);
            }

        }
    }
}

module.exports = ShengjiGame;