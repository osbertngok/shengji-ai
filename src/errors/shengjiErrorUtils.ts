/**
 * Created by osbertngok on 2/3/2017.
 */
'use strict';
import {ShengjiError} from './shengjiError';

export class ShengjiErrorUtils {

  static invalidDealerTeam(): ShengjiError {
    return new ShengjiError('Invalid Dealer Team');
  }

  static invalidPlayer(msg: string): ShengjiError {
    return new ShengjiError(msg);
  }

  static invalidSortFunction(): ShengjiError {
    return new ShengjiError('Invalid Sort Function');
  }

  static invalidSuit(): ShengjiError {
    return new ShengjiError('Invalid Suit');
  }

  static invalidRank(): ShengjiError {
    return new ShengjiError('Invalid Rank');
  }
}
