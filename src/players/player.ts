import {DeckedCard} from '../models/cards/deckedCard';
import {Pile} from '../models/cards/pile';
import {ShengjiGameRootState} from '../models/statemachines/shengjiGameRootState';

export interface IPlayer {
  dealCard(deckedCard: DeckedCard | null): DeckedCard;
  informDominantCardDeclaration(currentPotentialDeclarerPlayerIndex: number,
                                lastDeclaration: DeckedCard | null): void;
  loadRootState(rootState: ShengjiGameRootState): void;
  processBottomPile(stockPile: Pile): Pile;
  respondToDominantCardDeclaration(latestInformationProvider: number | null,
                                   lastDeclaration: DeckedCard | null): DeckedCard | null;
}
