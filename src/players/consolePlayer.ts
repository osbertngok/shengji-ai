/**
 * Created by osbertngok on 28/2/2017.
 */

'use strict';
import {DeckedCard} from '../models/cards/deckedCard';
import {Pile} from '../models/cards/pile';
import {IPlayer} from './player';

export class ConsolePlayer implements IPlayer {
  dealCard(deckedCard: DeckedCard | null): DeckedCard {
    throw new Error('Method not implemented.');
  }

  processBottomPile(stockPile: Pile): Pile {
    throw new Error('Method not implemented.');
  }

  informDominantCardDeclaration(currentPotentialDeclarerPlayerIndex: number, lastDeclaration: DeckedCard | null): null {
    console.log(`Player ${currentPotentialDeclarerPlayerIndex} declares with ${lastDeclaration}`);
    return null;
  }

  loadRootState(rootState): void {
    // TODO
  }

  respondToDominantCardDeclaration(latestInformationProvider: number, lastDeclaration: DeckedCard | null): null {
    // TODO
    return null;
  }
}
