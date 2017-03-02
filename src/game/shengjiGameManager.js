/**
 * Created by osbertngok on 27/2/2017.
 */
'use strict';

const redux = require('redux');

const ShengjiErrorUtils = require('../errors/shengjiErrorUtils');

const ShengjiGameRootState = require('../models/statemachines/shengjiGameRootState');

const Players = require('../players/index');


const GameActions = {
    'InitializeNewGame': 0,
    'InitializeNewRound': 1
};

class ShengjiGameManager {
    constructor() {

    }

    dealCards() {
        // Check which player to draw cards first

        // For each card:
        // 1) Deal cards per person, and validate the return
        // 2) Check if any other player respond

        // Dealer collect the rest of the cards, and get back the same amount of cards
        // Assuming Chao Di Pi is not supported

    }

    initializeNewGame() {
        this.store = redux.createStore(ShengjiGameManager.rootStateReducer);
        this.store.dispatch({
           'action': GameActions.InitializeNewGame
        });
    }

    initializeNewRound() {
        this.store.dispatch({
            'action': GameActions.InitializeNewRound
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

    static rootStateReducer(state, action) {
        if (!(action && action.action)) {
            throw ShengjiErrorUtils.invalidAction();
        }
        switch (action.action) {
            case GameActions.InitializeNewGame:

                break;
            default:
                throw ShengjiErrorUtils.invalidAction(`Unknown action ${action.action}`);
        }
    }
}

module.exports = ShengjiGameManager;