/**
 * Created by osbertngok on 27/2/2017.
 */
'use strict';

const redux = require('redux');

const ShengjiErrorUtils = require('../errors/shengjiErrorUtils');

const ShengjiGameRootState = require('./../models/statemachines/shengjiGameRootState');

const Players = require('../players/index');


const RoundActions = {
    'InitializeNewRound': 0
};

class ShengjiGameManager {
    constructor() {
        this.store = redux.createStore(ShengjiGameRootState.reducer);
    }

    dealCards() {
        // Check which player to draw cards first

        // For each card:
        // 1) Deal cards per person, and validate the return
        // 2) Check if any other player respond

        // Dealer collect the rest of the cards, and get back the same amount of cards
        // Assuming Chao Di Pi is not supported

    }

    initializeNewRound() {
        this.store.dispatch({
            'action': RoundActions.InitializeNewRound
        });
    }

    loadPlayers(players) {
        // Assert players are array of valid players
        if (!Array.isArray(players)) {
            throw ShengjiErrorUtils.invalidPlayer('ShengjiGameManager.loadPlayers accepts an array of players.');
        }

        // Currently only support 4 players
        if (players.length !== 4) {
            throw ShengjiErrorUtils.invalidPlayer('ShengjiGameManager.loadPlayers accepts 4 players only.');
        }

        // Validate per player
        for (let playerIndex = 0; playerIndex < players.length; ++playerIndex) {
            const player = players[playerIndex];
            try {
                Players.validatePlayer(player);
            }
            catch (ex) {
                throw ShengjiErrorUtils.invalidPlayer(`Player ${playerIndex}: ${ex.message}`);
            }

        }
    }
}

module.exports = ShengjiGameManager;