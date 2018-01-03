'use strict';
import {ShengjiErrorUtils} from '../../errors/shengjiErrorUtils';

export enum Suits {
  Spade = 0,
  Heart = 1,
  Club = 2,
  Diamond = 3,
  Joker = 4
}

const cardCollection: Card[] = Array(54);

export class Card {

  private _suit: number;

  private _rank: number;

  constructor(suit: Suits, rank: number) {
    Card.validate(suit, rank);
    return this.getOrCreate(suit, rank);
  }

  static getIndex(suit: Suits, rank: number): number {
    return suit * 13 + rank - 1;
  }

  static validate(suit: Suits, rank: number) {
    switch (suit) {
      case Suits.Spade:
      case Suits.Heart:
      case Suits.Club:
      case Suits.Diamond:
        if (typeof rank !== 'number' || !Number.isInteger(rank) || rank < 1 || rank > 13) {
          throw ShengjiErrorUtils.invalidRank();
        }
        break;
      case Suits.Joker:
        if (typeof rank !== 'number' || !Number.isInteger(rank) || rank < 1 || rank > 2) {
          throw ShengjiErrorUtils.invalidRank();
        }
        break;
      default:
        throw ShengjiErrorUtils.invalidSuit();
    }
  }

  getIndex(): number {
    return Card.getIndex(this.suit, this.rank);
  }

  getOrCreate(suit, rank): Card {
    const index: number = Card.getIndex(suit, rank);
    const existingCard: Card | undefined = cardCollection[index];
    if (existingCard) {
      return existingCard;
    } else {
      this._suit = suit;
      this._rank = rank;
      cardCollection[index] = this;
      Object.freeze(this);
      return this;
    }
  }

  toString(): string {
    if (this.suit === Suits.Joker) {
      switch (this.rank) {
        case 1:
          return 'jr';
        case 2:
          return 'JR';
        default:
          throw ShengjiErrorUtils.invalidRank();
      }
    } else {
      let suitString: string;
      let rankString: string;
      switch (this.suit) {
        case Suits.Spade:
          suitString = '♠';
          break;
        case Suits.Heart:
          suitString = '♥';
          break;
        case Suits.Club:
          suitString = '♣';
          break;
        case Suits.Diamond:
          suitString = '♦';
          break;
        default:
          throw ShengjiErrorUtils.invalidSuit();
      }
      switch (this.rank) {
        case 1:
          rankString = 'A';
          break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
          rankString = this.rank.toString();
          break;
        case 11:
          rankString = 'J';
          break;
        case 12:
          rankString = 'Q';
          break;
        case 13:
          rankString = 'K';
          break;
        default:
          throw ShengjiErrorUtils.invalidRank();
      }
      return `${suitString}${rankString}`;
    }
  }

  get suit(): Suits {
    return this._suit;
  }

  get rank(): number {
    return this._rank;
  }
}
