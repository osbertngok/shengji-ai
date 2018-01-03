/**
 * Created by osbertngok on 28/2/2017.
 */

'use strict';
import {DeckedCard} from '../models/cards/deckedCard';
import {Pile} from '../models/cards/pile';
import {ShengjiGameRootState} from '../models/statemachines/shengjiGameRootState';
import {IPlayer} from './player';

export class SimpleAIPlayer implements IPlayer {
  dealCard(deckedCard: DeckedCard | null): DeckedCard {
    throw new Error('Method not implemented.');
  }

  processBottomPile(stockPile: Pile): Pile {
    throw new Error('Method not implemented.');
  }

  informDominantCardDeclaration(currentPotentialDeclarerPlayerIndex: number, lastDeclaration: DeckedCard | null): void {
    throw new Error('Method not implemented.');
  }

  loadRootState(rootState: ShengjiGameRootState): void {
    throw new Error('Method not implemented.');
  }

  respondToDominantCardDeclaration(latestInformationProvider: number,
                                   lastDeclaration: DeckedCard | null): DeckedCard | null {
    throw new Error('Method not implemented.');
  }

}
