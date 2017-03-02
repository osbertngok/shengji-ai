/**
 * Created by osbertngok on 28/2/2017.
 */

const ShengjiGame = require('./game/shengjiGameManager');

const game = new ShengjiGame();

const Players = require('./players/index');

game.loadPlayers([
    new Players.SimpleAIPlayer(),
    new Players.SimpleAIPlayer(),
    new Players.SimpleAIPlayer(),
    new Players.SimpleAIPlayer()]
);

game.initializeNewGame();

game.initializeNewRound();

game.dealCards();