import {Colors, FiguresNames} from '../../utils/enums';
import figureLogo from '../../assets/white-pawn.png'

import {Board} from '../Board';
import {Cell} from '../Cell';

export class Figure {
  readonly name: FiguresNames
  readonly color: Colors
  readonly logo: typeof figureLogo | null

  constructor(name: FiguresNames, color: Colors, logo: typeof figureLogo | null ) {
    this.name = name;
    this.color = color;
    this.logo = logo;
  }
  canMove(board: Board, x: number, y: number) {}
  move(board: Board, selectedCell: Cell, targetCell: Cell) {
    board.cells[targetCell.x][targetCell.y].figure = selectedCell.figure;
    if (targetCell.figure) {
      board.cells[targetCell.x][targetCell.y].figure?.color === Colors.WHITE ?
        board['whiteFiguresLost'].push(targetCell.figure) :
        board['blackFiguresLost'].push(targetCell.figure)
    }
    board.cells[selectedCell.x][selectedCell.y].figure = null;
  }
}