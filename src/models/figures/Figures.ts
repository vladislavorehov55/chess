import {Colors, FiguresNames} from '../../utils/enums';
import figureLogo from '../../assets/white-pawn.png'

import {Board} from '../Board';

export class Figures {
  readonly name: FiguresNames
  readonly color: Colors
  readonly logo: typeof figureLogo | null

  constructor(name: FiguresNames, color: Colors, logo: typeof figureLogo | null ) {
    this.name = name;
    this.color = color;
    this.logo = logo;
  }
  canMove(board: Board, x: number, y: number) {}
}