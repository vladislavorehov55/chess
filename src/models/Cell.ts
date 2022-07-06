import {Colors} from '../utils/enums';
import {Figure} from './figures/Figure';
import {King} from './figures/King';
import {Bishop} from './figures/Bishop';
import {Queen} from './figures/Queen';
import {Knight} from './figures/Knight';
import {Pawn} from './figures/Pawn';
import {Rook} from './figures/Rook';

export class Cell {
  readonly x: number
  readonly y: number
  readonly color: Colors
  figure: null | Pawn | Rook | Knight | Bishop | Queen | King
  isAvailableForMove: Boolean

  constructor(x: number, y: number, color: Colors, figure: null) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.isAvailableForMove = false;
  }
}
