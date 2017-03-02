/**
 * Created by osbertngok on 28/2/2017.
 */

const ShengjiGame = require('./models/statemachines/shengjiGame');

const game = new ShengjiGame();

const Players = require('./players/index');

game.loadPlayers([
    new Players.SimpleAIPlayer(),
    new Players.SimpleAIPlayer(),
    new Players.SimpleAIPlayer(),
    new Players.SimpleAIPlayer()]
);

game.initializeNewRound();

game.dealCards();