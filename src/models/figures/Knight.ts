import {Figures} from './Figures';
import {Colors, FiguresNames} from '../../utils/enums';
import whiteKnightLogo from '../../assets/white-knight.png';
import blackKnightLogo from '../../assets/black-knight.png'
import {Board} from '../Board';
import {Cell} from '../Cell';

export class Knight extends Figures {
  constructor(color: Colors) {
    super(FiguresNames.KNIGHT, color, color === Colors.WHITE ? whiteKnightLogo : blackKnightLogo);
  }

  canMove(board: Board, x: number, y: number) {
    const cells: Cell[][] = board.cells;
    const moveSteps = [[-2, -1], [-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2]];
    for (let [stepX, stepY] of moveSteps) {
      if (cells[x + stepX]?.[y + stepY]?.figure === undefined) {
      } else if (cells[x + stepX]?.[y + stepY]?.figure === null) {
        cells[x + stepX][y + stepY].isAvailableForMove = true;
      } else if (cells[x + stepX][y + stepY].figure && cells[x + stepX][y + stepY].figure?.color !== this.color) {
        cells[x + stepX][y + stepY].isAvailableForMove = true;
      }
    }
  }
}