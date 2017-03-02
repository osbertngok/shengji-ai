/**
 * Created by osbertngok on 28/2/2017.
 */
'use strict';

const ConsolePlayer = require('./consolePlayer');
const SimpleAIPlayer = require('./simpleAIPlayer');
const ShengjiErrorUtils = require('../errors/shengjiErrorUtils');

const requiredPlayerFunctions = ['loadRootState'];

const validatePlayer = (player) => {
    // It needs to be an object
    if (player === null || typeof player !== 'object') {
        throw ShengjiErrorUtils.invalidPlayer('player is not an object.');
    }

    requiredPlayerFunctions.forEach((funcName) => {
        if (typeof player[funcName] !== 'function') {
            throw ShengjiErrorUtils.invalidPlayer(`player does not have function ${funcName}.`);
        }
    });
};

module.exports = {
    'ConsolePlayer': ConsolePlayer,
    'SimpleAIPlayer': SimpleAIPlayer,
    'validatePlayer': validatePlayer
};