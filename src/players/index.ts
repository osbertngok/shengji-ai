/**
 * Created by osbertngok on 28/2/2017.
 * Game Manager calls certain functions of the Player instance to convey new information
 * or retrieve next move of the player.
 */

'use strict';

export {ConsolePlayer} from './consolePlayer';
export {SimpleAIPlayer} from './simpleAIPlayer';
export {IPlayer} from './player';
import {ShengjiErrorUtils} from '../errors/shengjiErrorUtils';
import {IPlayer} from './player';

const requiredPlayerFunctions = [
    'loadRootState',
    'informDominantCardDeclaration',
    'respondToDominantCardDeclaration'];

export const validatePlayer = (player: IPlayer) => {
    // It needs to be an object
    if (player === null || typeof player !== 'object') {
        throw ShengjiErrorUtils.invalidPlayer('player is not an object.');
    }

    requiredPlayerFunctions.forEach( funcName => {
        if (typeof player[funcName] !== 'function') {
            throw ShengjiErrorUtils.invalidPlayer(`player does not have function ${funcName}.`);
        }
    });
};
