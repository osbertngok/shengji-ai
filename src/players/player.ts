import {DeckedCard} from '../models/cards/deckedCard';
import {Pile} from '../models/cards/pile';
import {ShengjiGameRootState} from '../models/statemachines/shengjiGameRootState';

export interface IPlayer {
  dealCard(deckedCard: DeckedCard | null): void;
  informDominantCardDeclaration(currentPotentialDeclarerPlayerIndex: number, lastDeclaration: number | null): void;
  loadRootState(rootState: ShengjiGameRootState): void;
  processBottomPile(stockPile: Pile): Pile;
  respondToDominantCardDeclaration(latestInformationProvider: number | null, lastDeclaration: number | null): void;
}
