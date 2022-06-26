import {Figures} from './Figures';
import {Colors, FiguresNames} from '../../utils/enums';
import whiteBishopLogo from '../../assets/white-bishop.png';
import blackBishopLogo from '../../assets/black-bishop.png'
import {Board} from '../Board';
import {Cell} from '../Cell';

export class Bishop extends Figures {
  constructor(color: Colors) {
    super(FiguresNames.BISHOP, color, color === Colors.WHITE ? whiteBishopLogo : blackBishopLogo);
  }

  canMove(board: Board, x: number, y: number) {
    const cells: Cell[][] = board.cells;
    let isContinueCheckFirstDiag = true;
    let isContinueCheckSecondDiag = true;
    let isContinueCheckThirdDiag = true;
    let isContinueCheckFourthDiag = true;

    for (let moveStep = 1; moveStep <= 7; moveStep++) {
      if (isContinueCheckFirstDiag) {
        if (cells[x - moveStep]?.[y - moveStep]?.figure === undefined) {
        } else if (cells[x - moveStep]?.[y - moveStep]?.figure === null) {
          cells[x - moveStep][y - moveStep].isAvailableForMove = true;
        }
        else if (cells[x - moveStep][y - moveStep].figure && cells[x - moveStep][y - moveStep].figure?.color === this.color) {
          isContinueCheckFirstDiag = false;
        }
        else if (cells[x - moveStep][y - moveStep].figure && cells[x - moveStep][y - moveStep].figure?.color !== this.color) {
          isContinueCheckFirstDiag = false;
          cells[x - moveStep][y - moveStep].isAvailableForMove = true;
        }
      }
      if (isContinueCheckSecondDiag) {
        if (cells[x - moveStep]?.[y + moveStep]?.figure === undefined) {
        } else if (cells[x - moveStep][y + moveStep].figure === null) {
          cells[x - moveStep][y + moveStep].isAvailableForMove = true;
        }
        else if (cells[x - moveStep][y + moveStep].figure && cells[x - moveStep][y + moveStep].figure?.color === this.color) {
          isContinueCheckSecondDiag = false;
        }
        else if (cells[x - moveStep][y + moveStep].figure && cells[x - moveStep][y + moveStep].figure?.color !== this.color) {
          isContinueCheckSecondDiag = false;
          cells[x - moveStep][y + moveStep].isAvailableForMove = true;
        }
      }
      if (isContinueCheckThirdDiag) {
        if (cells[x + moveStep]?.[y + moveStep]?.figure === undefined) {
        } else if (cells[x + moveStep][y + moveStep].figure === null) {
          cells[x + moveStep][y + moveStep].isAvailableForMove = true;
        }
        else if (cells[x + moveStep][y + moveStep].figure && cells[x + moveStep][y + moveStep].figure?.color === this.color) {
          isContinueCheckThirdDiag = false;
        }
        else if (cells[x + moveStep][y + moveStep].figure && cells[x + moveStep][y + moveStep].figure?.color !== this.color) {
          isContinueCheckThirdDiag = false;
          cells[x + moveStep][y + moveStep].isAvailableForMove = true;
        }
      }
      if (isContinueCheckFourthDiag) {
        if (cells[x + moveStep]?.[y - moveStep]?.figure === undefined) {
        } else if (cells[x + moveStep][y - moveStep].figure === null) {
          cells[x + moveStep][y - moveStep].isAvailableForMove = true;
        }
        else if (cells[x + moveStep][y - moveStep].figure && cells[x + moveStep][y - moveStep].figure?.color === this.color) {
          isContinueCheckFourthDiag = false;
        }
        else if (cells[x + moveStep][y - moveStep].figure && cells[x + moveStep][y - moveStep].figure?.color !== this.color) {
          isContinueCheckFourthDiag = false;
          cells[x + moveStep][y - moveStep].isAvailableForMove = true;
        }
      }
    }
  }
}