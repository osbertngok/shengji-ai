/**
 * Created by osbertngok on 27/2/2017.
 */
'use strict';

const createStore = require('redux').createStore;

const ShengjiErrorUtils = require('./../errors/shengjiErrorUtils');

const ShengjiGameRootState = require('./shengjiGameRootState');


const RoundActions = {
    'InitializeNewRound'   : 0
};

class ShengjiGame {
    constructor() {
        this.store = createStore(new ShengjiGameRootState());
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
    }
}

module.exports = ShengjiGame;