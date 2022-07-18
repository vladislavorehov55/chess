import {Figure} from './Figure';
import {Colors, FiguresNames} from '../../utils/enums';
import whiteRookLogo from '../../assets/white-rook.png';
import blackRookLogo from '../../assets/black-rook.png'
import {Board} from '../Board';
import {Cell} from '../Cell';

export class Rook extends Figure {
  constructor(color: Colors) {
    super(FiguresNames.ROOK, color, color === Colors.WHITE ? whiteRookLogo : blackRookLogo);
  }

  canMove(board: Board, x: number, y: number) {
    const cells: Cell[][] = board.cells;
    const checkRowAndColumns = super.checkRowAndColumns(cells, x, y);
    for (let moveStep = 1; moveStep <= 7; moveStep++) {
      checkRowAndColumns(moveStep);
    }
  }
}