'use strict';

import {ShengjiGameState} from './shengjiGameState';

export class ShengjiGameRootState {

  private _state: ShengjiGameState;

  constructor() {
    this._state = new ShengjiGameState();
  }

  get state() {
    return this._state;
  }

  get status() {
    return this.state.status;
  }
}
