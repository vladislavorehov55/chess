import {Figures} from './Figures';
import {Colors, FiguresNames} from '../../utils/enums';
import whiteQueenLogo from '../../assets/white-queen.png';
import blackQueenLogo from '../../assets/black-queen.png'
import {Board} from '../Board';
import {Cell} from '../Cell';

export class Queen extends Figures {
  constructor(color: Colors) {
    super(FiguresNames.QUEEN, color,color === Colors.WHITE ? whiteQueenLogo : blackQueenLogo);
  }
  canMove(board: Board, x: number, y: number) {
    const cells: Cell[][] = board.cells;
    let isContinueCheckFirstDiag = true;
    let isContinueCheckSecondDiag = true;
    let isContinueCheckThirdDiag = true;
    let isContinueCheckFourthDiag = true;
    let isContinueCheckVerticalLine = true;
    let isContinueCheckHorizontalLine = true;

    for (let moveStep = 1, moveStep2 = 0; moveStep < 8; moveStep++, moveStep2++) {
      if (isContinueCheckFirstDiag) {
        if (cells[x - moveStep]?.[y - moveStep]?.figure === undefined) {
        } else if (cells[x - moveStep]?.[y - moveStep]?.figure === null) {
          cells[x - moveStep][y - moveStep].isAvailableForMove = true;
        } else if (cells[x - moveStep][y - moveStep].figure && cells[x - moveStep][y - moveStep].figure?.color !== this.color) {
          isContinueCheckFirstDiag = false;
          cells[x - moveStep][y - moveStep].isAvailableForMove = true;

        }
      }
      if (isContinueCheckSecondDiag) {
        if (cells[x - moveStep]?.[y + moveStep]?.figure === undefined) {
        } else if (cells[x - moveStep][y + moveStep].figure === null) {
          cells[x - moveStep][y + moveStep].isAvailableForMove = true;
        } else if (cells[x - moveStep][y + moveStep].figure && cells[x - moveStep][y + moveStep].figure?.color !== this.color) {
          isContinueCheckSecondDiag = false;
          cells[x - moveStep][y + moveStep].isAvailableForMove = true;
        }
      }
      if (isContinueCheckThirdDiag) {
        if (cells[x + moveStep]?.[y + moveStep]?.figure === undefined) {
        } else if (cells[x + moveStep][y + moveStep].figure === null) {
          cells[x + moveStep][y + moveStep].isAvailableForMove = true;
        } else if (cells[x + moveStep][y + moveStep].figure && cells[x + moveStep][y + moveStep].figure?.color !== this.color) {
          isContinueCheckThirdDiag = false;
          cells[x + moveStep][y + moveStep].isAvailableForMove = true;
        }
      }
      if (isContinueCheckFourthDiag) {
        if (cells[x + moveStep]?.[y - moveStep]?.figure === undefined) {
        } else if (cells[x + moveStep][y - moveStep].figure === null) {
          cells[x + moveStep][y - moveStep].isAvailableForMove = true;
        }
        else if (cells[x + moveStep][y - moveStep].figure && cells[x + moveStep][y - moveStep].figure?.color !== this.color) {
          isContinueCheckFourthDiag = false;
          cells[x + moveStep][y - moveStep].isAvailableForMove = true;
        }
      }
      if (isContinueCheckHorizontalLine) {
        if (cells[x + moveStep2][y].figure === null) {
          cells[x + moveStep2][y].isAvailableForMove = true;
        }
        else {
          if (cells[x + moveStep2][y].figure?.color !== this.color) {
            cells[x + moveStep2][y].isAvailableForMove = true;
            isContinueCheckHorizontalLine = false;
          }
        }
      }
      if (isContinueCheckVerticalLine) {
        if (cells[x][y + moveStep2].figure === null) {
          cells[x][y + moveStep2].isAvailableForMove = true;
        }
        else {
          if (cells[x][y + moveStep2].figure?.color !== this.color) {
            cells[x][y + moveStep2].isAvailableForMove = true;
            isContinueCheckVerticalLine = false;
          }
        }
      }
    }
  }
}