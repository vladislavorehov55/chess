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
    let isContinueUpperLine = true;
    let isContinueCheckRightLine = true;
    let isContinueCheckLowerLine = true;
    let isContinueCheckLeftLine = true;
    for (let moveStep = 1; moveStep <= 7; moveStep++) {
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