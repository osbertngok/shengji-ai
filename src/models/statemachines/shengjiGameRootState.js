'use strict';

const ShengjiGameState = require('./shengjiGameState');

class ShengjiGameRootState {

    constructor(){
        this._state = new ShengjiGameState();
    }

    get state() {
        return this._state;
    }

    get status() {
        return this.state.status;
    }
}

module.exports = ShengjiGameRootState;
