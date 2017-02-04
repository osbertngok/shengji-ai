'use strict';
class ShengjiError extends Error {
  constructor(message) {
    super(message);
  }
}


class ShengjiErrorFactory {
  static invalidSuit() {
    return new ShengjiError('Invalid Suit');
  }

  static invalidRank() {
    return new ShengjiError('Invalid Rank');
  }
}

module.exports = ShengjiErrorFactory;