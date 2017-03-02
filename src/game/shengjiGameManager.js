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

    get rootState() {
        return this._rootState;
    }

    constructor() {
        this._rootState = new ShengjiGameRootState();
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
    }

    initializeNewRound() {
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

        this.store.dispatch({
            'type': GameActionTypes.LoadPlayers
        });
    }

    static rootStateReducer(state, action) {
        ShengjiGameManager.validateStateTransitionPermission(state, action);
        if (!(action && action.type)) {
            // Initialize a new State;
            return new ShengjiGameRootState();
        }

        switch (action.type) {
            case constants.redux.REDUX_INIT:
                return new ShengjiGameRootState();
            case GameActionTypes.InitializeNewGame:
                break;
            case GameActionTypes.LoadPlayers:
                break;
            default:
                throw ShengjiErrorUtils.invalidAction(`Unknown action ${action.type}`);
        }
    }

    static validateStateTransitionPermission(state, action) {
        if (!checkStateTransitionPermission(state, action)) {
            const stateString = state ? gameStatusesToString(state.status) : 'undefined_status';
            const actionString = action ? gameActionTypesToString(action.type) : 'undefined_action';
            throw ShengjiErrorUtils.invalidStateTransition(stateString, actionString);
        }
    }
}

module.exports = ShengjiGameManager;