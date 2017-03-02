/**
 * Created by osbertngok on 2/3/2017.
 */
'use strict';
const ShengjiError = require('./shengjiError');

class ShengjiErrorUtils {

    static invalidAction() {
        return new ShengjiError('Invalid Action');
    }

    static invalidDealerTeam() {
        return new ShengjiError('Invalid Dealer Team');
    }

    static invalidPlayer(msg) {
        return new ShengjiError(msg);
    }

    static invalidSortFunction() {
        return new ShengjiError('Invalid Sort Function');
    }

    static invalidSuit() {
        return new ShengjiError('Invalid Suit');
    }

    static invalidRank() {
        return new ShengjiError('Invalid Rank');
    }

    static invalidStateTransition(stateString, actionString) {
        return new ShengjiError(`State ${stateString} cannot be processed with action ${actionString}.`);
    }
}

module.exports = ShengjiErrorUtils;