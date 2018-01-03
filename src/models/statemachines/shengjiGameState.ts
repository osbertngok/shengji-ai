'use strict';

import {ShengjiErrorUtils} from '../../errors/shengjiErrorUtils';
import {Card} from '../cards/card';
import {DeckedCard} from '../cards/deckedCard';
import {GameStatuses as ShengjiGameStateStatuses} from './shengjiGameStateStatus';

export interface IShengjiGameStateConfiguration {
  team1Rank: number;
  team2Rank: number;
  dealerTeam: number;
  dealer: number;
  dominantCard: Card | null;
  status: ShengjiGameStateStatuses;
}

export class ShengjiGameState {

  private _team1Rank: number;
  private _team2Rank: number;
  private _dealerTeam: number;
  private _dealer: number;
  private _dominantCard: Card | null;
  private _status: ShengjiGameStateStatuses;
  private _noOfPlayers: number;

  constructor(config?: IShengjiGameStateConfiguration) {
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

  static validate(config: IShengjiGameStateConfiguration): void {
    if (config.dealerTeam !== 1 && config.dealerTeam !== 2) {
      throw ShengjiErrorUtils.invalidDealerTeam();
    }
  }

  get currentRank(): number {
    switch (this.dealerTeam) {
      case 1:
        return this.team1Rank;
      case 2:
        return this.team2Rank;
      default:
        throw ShengjiErrorUtils.invalidDealerTeam();
    }
  }

  get dealerTeam(): number {
    return this._dealerTeam;
  }

  get dealer(): number {
    return this._dealer;
  }

  get dominantCard(): Card | null {
    return this._dominantCard;
  }

  get noOfPlayers(): number {
    return this._noOfPlayers;
  }

  get status(): ShengjiGameStateStatuses {
    return this._status;
  }

  get team1Rank(): number {
    return this._team1Rank;
  }

  get team2Rank(): number {
    return this._team2Rank;
  }

  declareDominantCards(currentPotentialDeclarerPlayerIndex: number, currentDeclaration: DeckedCard | null): void {
    throw new Error('not implemented');
  }

  isDominantCardDeclared(): boolean {
    throw new Error('not implemented');
  }
}
