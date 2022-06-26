import {Figures} from './Figures';
import {Colors, FiguresNames} from '../../utils/enums';
import whitePawnLogo from '../../assets/white-pawn.png'
import blackPawnLogo from '../../assets/black-pawn.png';
import {Cell} from '../Cell';
import {Board} from '../Board';


export class Pawn extends Figures {
  isFirstStep: Boolean

  constructor(color: Colors) {
    super(FiguresNames.PAWN, color, color === Colors.WHITE ? whitePawnLogo : blackPawnLogo);
    this.isFirstStep = true;
  }

  canMove(board: Board, x: number, y: number) {
    const cells: Cell[][] = board.cells;
    let direction = this.color === Colors.WHITE ? -1 : 1;
    if (this.isFirstStep) {
      for (let i = 1; i <= 2; i++) {
        if (cells[x + i * direction][y] && !cells[x + i * direction][y].figure) {
          cells[x + i * direction][y].isAvailableForMove = !cells[x + i * direction][y].isAvailableForMove;
        } else break
      }
      this.isFirstStep = false;
    } else {
      if (cells[x + direction][y] && !cells[x + direction][y].figure) {
        cells[x + direction][y].isAvailableForMove = !cells[x + direction][y].isAvailableForMove;
      }
    }
    if (cells[x + direction]?.[y + 1]?.figure && cells[x + direction][y + 1].figure?.color !== this.color) {
      cells[x + direction][y + 1].isAvailableForMove = !cells[x + direction][y + 1].isAvailableForMove;
    }
    if (cells[x + direction]?.[y - 1]?.figure && cells[x + direction][y - 1].figure?.color !== this.color) {
      cells[x + direction][y - 1].isAvailableForMove = !cells[x + direction][y - 1].isAvailableForMove;
    }
  }
}