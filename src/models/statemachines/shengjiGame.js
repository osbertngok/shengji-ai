/**
 * Created by osbertngok on 27/2/2017.
 */
'use strict';

const createStore = require('redux').createStore;

const ShengjiErrorFactory = require('./../errors/shengjiError');

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
}

module.exports = ShengjiGame;