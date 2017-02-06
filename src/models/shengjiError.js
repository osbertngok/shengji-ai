'use strict';
class ShengjiError extends Error {
  constructor(message) {
    super(message);
  }
}


class ShengjiErrorFactory {

  static invalidDealerTeam() {
    return new ShengjiError('Invalid Dealer Team');
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
}

module.exports = ShengjiErrorFactory;