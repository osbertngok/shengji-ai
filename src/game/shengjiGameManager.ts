/**
 * Created by osbertngok on 27/2/2017.
 */

'use strict';

import {ShengjiErrorUtils} from '../errors/shengjiErrorUtils';
import {Deck} from '../models/cards/deck';
import {DeckedCard} from '../models/cards/deckedCard';
import {Pile} from '../models/cards/pile';
import {ShengjiGameRootState} from '../models/statemachines/shengjiGameRootState';
import * as Players from '../players/index';
import * as PileUtils from '../utils/pileUtils';

export class ShengjiGameManager {

    private _players: Players.IPlayer[];

    private _rootState: ShengjiGameRootState;

    private _stockPile: Pile;

    constructor() {
        this._rootState = new ShengjiGameRootState();
    }

    validatePlayers(players) {
        // Assert players are array of valid players
        if (!Array.isArray(players)) {
            throw ShengjiErrorUtils.invalidPlayer('ShengjiGameManager.loadPlayers accepts an array of players.');
        }

        // Currently only support 4 players
        if (players.length !== this.rootState.state.noOfPlayers) {
            throw ShengjiErrorUtils.invalidPlayer(
                `ShengjiGameManager.loadPlayers accepts ${this.rootState.state.noOfPlayers} players only.`
            );
        }

        // Validate per player
        for (let playerIndex = 0; playerIndex < players.length; ++playerIndex) {
            const player = players[playerIndex];
            try {
                Players.validatePlayer(player);
            } catch (ex) {
                throw ShengjiErrorUtils.invalidPlayer(`Player ${playerIndex}: ${ex.message}`);
            }

        }
    }

    dealCards() {
        // Check which player to draw cards first
        const dealerIndex = this.rootState.state.dealer;
        let currentPlayerIndex = dealerIndex;

        const bottomCardsNo = 6; // when playing with 3 decks

        // For each card:

        while (this.stockPile.length > bottomCardsNo) {
            const dealtCard: DeckedCard = this.stockPile.dealCard();
            let lastDeclaration = null;
            let latestInformationProvider = currentPlayerIndex;
            let currentPotentialDeclarerPlayerIndex =
              (latestInformationProvider + 1) % this.rootState.state.noOfPlayers;

            while (currentPotentialDeclarerPlayerIndex !== latestInformationProvider) {
                //noinspection JSUnresolvedFunction
                const currentDeclaration = latestInformationProvider === null ?
                    this.players[currentPlayerIndex].dealCard(dealtCard) :
                    this.players[currentPotentialDeclarerPlayerIndex].respondToDominantCardDeclaration(
                        latestInformationProvider,
                        lastDeclaration
                    );
                if (currentDeclaration) {
                    this.validateDeclaration(currentPotentialDeclarerPlayerIndex, currentDeclaration);
                    // If it is valid
                    this.rootState.state.declareDominantCards(currentPotentialDeclarerPlayerIndex, currentDeclaration);
                    lastDeclaration = currentDeclaration;
                    latestInformationProvider = currentPotentialDeclarerPlayerIndex;
                    for (let playerIndex = 0; playerIndex < this.rootState.state.noOfPlayers; playerIndex++) {
                        this.players[playerIndex].informDominantCardDeclaration(currentPotentialDeclarerPlayerIndex,
                          lastDeclaration);
                    }
                }
                currentPotentialDeclarerPlayerIndex =
                  (currentPotentialDeclarerPlayerIndex + 1) % this.rootState.state.noOfPlayers;
            }
            currentPlayerIndex = (currentPlayerIndex + 1) % this.rootState.state.noOfPlayers;
        }

        // Joker will be the dominant card if
        if (!this.rootState.state.isDominantCardDecalred()) {
            // this.rootState.state.declareDominantCards();
        }

        // Dealer collect the rest of the cards, and get back the same amount of cards
        const bottomPile = this.players[this.rootState.state.dealer].processBottomPile(this.stockPile.clone());
        this.validateBottomPile(bottomPile, this.rootState.state.dealer, this.stockPile);
        // Assuming Chao Di Pi is not supported

    }

    loadPlayers(players) {
        this.players = players;
    }

    initializeNewGame() {
        // Inform all players current state
        for (const player of this.players) {
            player.loadRootState(this.rootState);
        }
    }

    initializeNewRound() {
        // get 3 decks of playing cards and shuffle
        // Add 0, 1, 2 decks to stock pile
        const stockPile: Pile =
          PileUtils.concat(...[0, 1, 2].map((pileIndex: number): Pile => new Deck(pileIndex).toPile()));
        stockPile.shuffle();
        this.stockPile = stockPile;
    }

    get players() {
        if (!this._players) {
            throw ShengjiErrorUtils.invalidPlayer('Players not initialized.');
        }
        return this._players;
    }

    set players(players) {
        this.validatePlayers(players);
        this._players = players;
    }

    get stockPile() {
        return this._stockPile;
    }

    set stockPile(stockPile) {
        this._stockPile = stockPile;
    }

    get rootState() {
        return this._rootState;
    }

    validateDeclaration(currentPlayerIndex, lastDeclaration) {
        return;
    }

    validateBottomPile(bottomPile: Pile, dealer: number, stockPile: Pile) {
        throw new Error('Not Implemeneted');
    }
}
