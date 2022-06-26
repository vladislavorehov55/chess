import {Figures} from './Figures';
import {Colors, FiguresNames} from '../../utils/enums';
import whiteRookLogo from '../../assets/white-rook.png';
import blackRookLogo from '../../assets/black-rook.png'
import {Board} from '../Board';
import {Cell} from '../Cell';

export class Rook extends Figures {
  constructor(color: Colors) {
    super(FiguresNames.ROOK, color, color === Colors.WHITE ? whiteRookLogo : blackRookLogo);
  }

  canMove(board: Board, x: number, y: number) {
    const cells: Cell[][] = board.cells;
    for (let moveStep = 0; moveStep < 8; moveStep++) {
      if (cells[x][moveStep].figure === null) {
        cells[x][moveStep].isAvailableForMove = true;
      } else if (cells[x][moveStep].figure && cells[x][moveStep].figure?.color !== this.color) {
        cells[x][moveStep].isAvailableForMove = true;
        break;
      }
    }
    for (let moveStep = 0; moveStep < 8; moveStep++) {
      if (cells[moveStep][y].figure === null) {
        cells[moveStep][y].isAvailableForMove = true;
      } else if (cells[moveStep][y].figure && cells[moveStep][y].figure?.color !== this.color) {
        cells[moveStep][y].isAvailableForMove = true;
        break;
      }
    }
  }
}