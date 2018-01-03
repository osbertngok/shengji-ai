/**
 * Created by osbertngok on 28/2/2017.
 */

import {ShengjiGameManager as ShengjiGame} from './game/shengjiGameManager';

const game: ShengjiGame = new ShengjiGame();

import * as Players from './players/index';

game.loadPlayers([
  new Players.SimpleAIPlayer(),
  new Players.SimpleAIPlayer(),
  new Players.SimpleAIPlayer(),
  new Players.SimpleAIPlayer()]
);

game.initializeNewGame();

game.initializeNewRound();

game.dealCards();
