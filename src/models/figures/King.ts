import {Figures} from './Figures';
import {Colors, FiguresNames} from '../../utils/enums';
import whiteKingLogo from '../../assets/white-king.png';
import blackKingLogo from '../../assets/black-king.png'
import {Board} from '../Board';
import {Cell} from '../Cell';

export class King extends Figures {
  constructor(color: Colors) {
    super(FiguresNames.KING, color, color === Colors.WHITE ? whiteKingLogo : blackKingLogo);
  }

  canMove(board: Board, x: number, y: number) {
    const cells: Cell[][] = board.cells;
    const moveSteps: number[][] = [
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1]
    ]
    for (let [stepX, stepY] of moveSteps) {
      if (cells[x + stepX]?.[y + stepY]?.figure === undefined) {
      } else if (cells[x + stepX][y + stepY].figure === null) {
        cells[x + stepX][y + stepY].isAvailableForMove = true;
      } else if (cells[x + stepX][y + stepY].figure && cells[x + stepX][y + stepY].figure?.color !== this.color) {
        cells[x + stepX][y + stepY].isAvailableForMove = true;
      }
    }
  }
}