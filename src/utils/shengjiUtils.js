'use strict';

const Card = require('../models/card');

const Predicates = require('./shengjiPredicates');

const Compare = require('./shengjiCompare');

class ShengjiUtils {
  constructor() {

  }

  get predicates() {
    return Predicates;
  }

  get compare() {
    return Compare;
  }
}

module.exports = ShengjiUtils;