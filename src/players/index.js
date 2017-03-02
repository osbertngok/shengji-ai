/**
 * Created by osbertngok on 28/2/2017.
 */
'use strict';

const ConsolePlayer = require('./consolePlayer');
const SimpleAIPlayer = require('./simpleAIPlayer');
const ShengjiErrorUtils = require('../errors/shengjiErrorUtils');

const validatePlayer = (player) => {
    // It needs to be an object
    if (player === null || typeof player !== 'object') {
        throw ShengjiErrorUtils.invalidPlayer('player is not an object.');
    }
};

module.exports = {
    'ConsolePlayer': ConsolePlayer,
    'SimpleAIPlayer': SimpleAIPlayer,
    'validatePlayer': validatePlayer
};