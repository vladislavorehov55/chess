import {Figure} from './Figure';
import {Colors, FiguresNames} from '../../utils/enums';
import whiteQueenLogo from '../../assets/white-queen.png';
import blackQueenLogo from '../../assets/black-queen.png'
import {Board} from '../Board';
import {Cell} from '../Cell';

export class Queen extends Figure {
  constructor(color: Colors) {
    super(FiguresNames.QUEEN, color,color === Colors.WHITE ? whiteQueenLogo : blackQueenLogo);
  }
  canMove(board: Board, x: number, y: number) {
    const cells: Cell[][] = board.cells;
    const checkDiag = super.checkDiagonals(cells, x, y);
    const checkRowAndCol = super.checkRowAndColumns(cells, x, y)
    for (let moveStep = 1; moveStep <= 7; moveStep++) {
      checkDiag(moveStep);
      checkRowAndCol(moveStep)
    }
  }
}