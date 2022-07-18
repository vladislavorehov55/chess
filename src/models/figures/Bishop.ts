import {Figure} from './Figure';
import {Colors, FiguresNames} from '../../utils/enums';
import whiteBishopLogo from '../../assets/white-bishop.png';
import blackBishopLogo from '../../assets/black-bishop.png'
import {Board} from '../Board';
import {Cell} from '../Cell';

export class Bishop extends Figure {
  constructor(color: Colors) {
    super(FiguresNames.BISHOP, color, color === Colors.WHITE ? whiteBishopLogo : blackBishopLogo);
  }

  canMove(board: Board, x: number, y: number) {
    const cells: Cell[][] = board.cells;
    const checkDiagonals = super.checkDiagonals(cells, x, y);
    for (let moveStep = 1; moveStep <= 7; moveStep++) {
      checkDiagonals(moveStep);
    }
  }
}