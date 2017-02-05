'use strict';
class ShengjiGameState {
  constructor(config){
    if (config === undefined) {
      this._team1Rank = 2;
      this._team2Rank = 2;
      this._dealerTeam = 1;
      this._dealer = 0;
      this._dominantCard = null;
    } else {
      this._team1Rank = config.team1Rank;
      this._team2Rank = config.team2Rank;
      this._dealerTeam = config.dealerTeam;
      this._dealer = config.dealer;
      this._dominantCard = config.dominantCard;
    }

    get currentRank(){
      switch (this.dealerTeam) {
        case 1:
          return this.team1Rank;
        case 2:
          return this.team2Rank;
        default:
          throw ShengjiErrorFactory.invalidDealerTeam();
      }
    }
    
    get team1Rank(){
      return this._team1Rank;
    }

    get team2Rank(){
      return this._team2Rank;
    }

    get dealerTeam(){
      return this._dealerTeam;
    }

    get dealer(){
      return this._dealer;
    }

    get dominantCard(){
      return this._dominantCard;
    }
  }
}

module.exports = ShengjiGameState;