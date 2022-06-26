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
    let isContinueUpperLine = true;
    let isContinueCheckRightLine = true;
    let isContinueCheckLowerLine = true;
    let isContinueCheckLeftLine = true;

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
      if (isContinueUpperLine) {
        if (cells[x - moveStep]?.[y]?.figure === undefined) {
        } else if (cells[x - moveStep][y].figure === null) {
          cells[x - moveStep][y].isAvailableForMove = true;
        } else if (cells[x - moveStep][y].figure && cells[x - moveStep][y].figure?.color === this.color) {
          isContinueUpperLine = false;
        } else if (cells[x - moveStep][y].figure && cells[x - moveStep][y].figure?.color !== this.color) {
          isContinueUpperLine = false;
          cells[x - moveStep][y].isAvailableForMove = true;
        }
      }
      if (isContinueCheckRightLine) {
        if (cells[x]?.[y + moveStep]?.figure === undefined) {
        } else if (cells[x][y + moveStep].figure === null) {
          cells[x][y + moveStep].isAvailableForMove = true;
        } else if (cells[x][y + moveStep].figure && cells[x][y + moveStep].figure?.color === this.color) {
          isContinueCheckRightLine = false;
        } else if (cells[x][y + moveStep].figure && cells[x][y + moveStep].figure?.color !== this.color) {
          isContinueCheckRightLine = false;
          cells[x][y + moveStep].isAvailableForMove = true;
        }
      }
      if (isContinueCheckLowerLine) {
        if (cells[x + moveStep]?.[y]?.figure === undefined) {
        } else if (cells[x + moveStep][y].figure === null) {
          cells[x + moveStep][y].isAvailableForMove = true;
        } else if (cells[x + moveStep][y].figure && cells[x + moveStep][y].figure?.color === this.color) {
          isContinueCheckLowerLine = false;
        } else if (cells[x + moveStep][y].figure && cells[x + moveStep][y].figure?.color !== this.color) {
          isContinueCheckLowerLine = false;
          cells[x + moveStep][y].isAvailableForMove = true;
        }
      }
      if (isContinueCheckLeftLine) {
        if (cells[x]?.[y - moveStep]?.figure === undefined) {
        } else if (cells[x][y - moveStep].figure === null) {
          cells[x][y - moveStep].isAvailableForMove = true;
        } else if (cells[x][y - moveStep].figure && cells[x][y - moveStep].figure?.color === this.color) {
          isContinueCheckLeftLine = false;
        } else if (cells[x][y - moveStep].figure && cells[x][y - moveStep].figure?.color !== this.color) {
          isContinueCheckLeftLine = false;
          cells[x][y - moveStep].isAvailableForMove = true;
        }
      }
    }
  }
}