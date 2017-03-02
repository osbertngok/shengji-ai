/**
 * Created by osbertngok on 27/2/2017.
 */
'use strict';

const constants = require('../constants/index');
const EnumUtils = require('../utils/enumUtils');
const ShengjiErrorUtils = require('../errors/shengjiErrorUtils');
const ShengjiGameRootState = require('../models/statemachines/shengjiGameRootState');
const Players = require('../players/index');
const GameStatuses = require('../models/statemachines/shengjiGameStateStatus');
const GameActionTypes = require('../models/statemachines/shengjiGameStateActionType');

const gameStatusesToString = EnumUtils.getToEnumStringFunc(GameStatuses);
const gameActionTypesToString = EnumUtils.getToEnumStringFunc(GameActionTypes);

const checkStateTransitionPermission = (state, action) => {
    if (!(action && action.hasOwnProperty('type'))) {
        return !state;
    }

    switch (action.type) {
        case constants.redux.REDUX_INIT:
            return state === undefined;
        case GameActionTypes.InitializeNewGame:
            return [GameStatuses.GameCreated].indexOf(state.status) !== -1;
        case GameActionTypes.LoadPlayers:
            return [GameStatuses.PlayersLoaded].indexOf(state.status) !== -1;
        case GameActionTypes.InitializeNewRound:
            return [GameStatuses.GameStarted].indexOf(state.status) !== -1;
        default:
            // Unknown action type
            return false;
    }
    return false;
};

class ShengjiGameManager {


    constructor() {
        this._rootState = new ShengjiGameRootState();
    }

    static validatePlayers(players) {
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

    dealCards() {
        // Check which player to draw cards first
        const dealerIndex = this.rootState.state.dealer;

        // For each card:
        // 1) Deal cards per person, and validate the return
        // 2) Check if any other player respond

        // Dealer collect the rest of the cards, and get back the same amount of cards
        // Assuming Chao Di Pi is not supported

    }

    loadPlayers(players) {
        this.players = players;
    }

    initializeNewGame() {
        // Inform all players current state
        for (let player of this.players) {
            player.loadRootState(this.rootState);
        }
    }


    initializeNewRound() {

    }

    get players() {
        if (!this._players) {
            throw ShengjiErrorUtils.invalidPlayer('Players not initialized.');
        }
        return this._players;
    }

    set players(players) {
        ShengjiGameManager.validatePlayers(players);
        this._players = players;
    }


    get rootState() {
        return this._rootState;
    }


}

module.exports = ShengjiGameManager;