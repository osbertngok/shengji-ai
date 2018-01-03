'use strict';

import {ShengjiGameState} from './shengjiGameState';
import {GameStatuses as ShengjiGameStateStatuses} from './shengjiGameStateStatus';

export class ShengjiGameRootState {

  private _state: ShengjiGameState;

  constructor() {
    this._state = new ShengjiGameState();
  }

  get state(): ShengjiGameState {
    return this._state;
  }

  get status(): ShengjiGameStateStatuses {
    return this.state.status;
  }
}
