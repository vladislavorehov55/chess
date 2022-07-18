import {Colors, FiguresNames} from '../../utils/enums';
import figureLogo from '../../assets/white-pawn.png'

import {Board} from '../Board';
import {Cell} from '../Cell';

export class Figure {
  readonly name: FiguresNames
  readonly color: Colors
  readonly logo: typeof figureLogo | null

  constructor(name: FiguresNames, color: Colors, logo: typeof figureLogo | null ) {
    this.name = name;
    this.color = color;
    this.logo = logo;
  }
  canMove(board: Board, x: number, y: number) {}

  checkDiagonals(cells: Cell[][], x: number, y:number) {
    let isContinueCheckFirstDiag = true;
    let isContinueCheckSecondDiag = true;
    let isContinueCheckThirdDiag = true;
    let isContinueCheckFourthDiag = true;
    return (moveStep: number) => {
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
  checkRowAndColumns(cells: Cell[][], x: number, y: number) {
    let isContinueUpperLine = true;
    let isContinueCheckRightLine = true;
    let isContinueCheckLowerLine = true;
    let isContinueCheckLeftLine = true;
    return (moveStep: number) => {
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
  move(board: Board, selectedCell: Cell, targetCell: Cell) {
    board.cells[targetCell.x][targetCell.y].figure = selectedCell.figure;
    if (targetCell.figure) {
      board.cells[targetCell.x][targetCell.y].figure?.color === Colors.WHITE ?
        board['whiteFiguresLost'].push(targetCell.figure) :
        board['blackFiguresLost'].push(targetCell.figure)
    }
    board.cells[selectedCell.x][selectedCell.y].figure = null;
  }
}