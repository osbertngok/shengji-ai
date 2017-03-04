'use strict';

const ShengjiGameStateStatuses = require('./shengjiGameStateStatus');
const ShengjiErrorUtils = require('../../errors/shengjiErrorUtils');

class ShengjiGameState {
    constructor(config) {
        if (config === undefined) {
            this._team1Rank = 2;
            this._team2Rank = 2;
            this._dealerTeam = 1;
            this._dealer = 0;
            this._dominantCard = null;
            this._status = ShengjiGameStateStatuses.GameCreated;
        } else {
            ShengjiGameState.validate(config);
            this._team1Rank = config.team1Rank;
            this._team2Rank = config.team2Rank;
            this._dealerTeam = config.dealerTeam;
            this._dealer = config.dealer;
            this._dominantCard = config.dominantCard;
            this._status = config.status;
        }
        this._noOfPlayers = 4;
        Object.freeze(this);
        return this;
    }

    static validate(config) {
        if (config.dealerTeam !== 1 && config.dealerTeam !== 2) {
            throw ShengjiErrorUtils.invalidDealerTeam();
        }
    }

    get currentRank() {
        switch (this.dealerTeam) {
            case 1:
                return this.team1Rank;
            case 2:
                return this.team2Rank;
            default:
                throw ShengjiErrorUtils.invalidDealerTeam();
        }
    }

    get dealerTeam() {
        return this._dealerTeam;
    }

    get dealer() {
        return this._dealer;
    }

    get dominantCard() {
        return this._dominantCard;
    }

    get noOfPlayers() {
        return this._noOfPlayers;
    }

    get status() {
        return this._status;
    }

    get team1Rank() {
        return this._team1Rank;
    }

    get team2Rank() {
        return this._team2Rank;
    }

}

module.exports = ShengjiGameState;