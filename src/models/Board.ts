import {Cell} from './Cell';
import {Colors, FiguresNames} from '../utils/enums';
import {Pawn} from './figures/Pawn';
import {Rook} from './figures/Rook';
import {Knight} from './figures/Knight';
import {Bishop} from './figures/Bishop';
import {King} from './figures/King';
import {Queen} from './figures/Queen';
import {cloneDeep} from 'lodash';
import {Figure} from './figures/Figure';
import {KingsPositions} from '../components/BoardComponent';


export class Board {
  cells: Cell[][] = []
  whiteFiguresLost: Figure[] = []
  blackFiguresLost: Figure[] = []
  initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = []
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(i, j, Colors.BLACK, null))
        } else {
          row.push(new Cell(i, j, Colors.WHITE, null))
        }
      }
      this.cells.push(row)
    }
    this.addFigures()
  }

  addFigures() {
    for (let i = 0; i < 8; i++) {
      this.cells[1][i].figure = new Pawn(Colors.BLACK);
      this.cells[6][i].figure = new Pawn(Colors.WHITE);
      if (i === 0) {
        this.cells[0][i].figure = new Rook(Colors.BLACK);
        this.cells[0][7 - i].figure = new Rook(Colors.BLACK);
        this.cells[7][i].figure = new Rook(Colors.WHITE);
        this.cells[7][7 - i].figure = new Rook(Colors.WHITE);
      }
      else if (i === 1) {
        this.cells[0][i].figure = new Knight(Colors.BLACK);
        this.cells[0][7 - i].figure = new Knight(Colors.BLACK);
        this.cells[7][i].figure = new Knight(Colors.WHITE);
        this.cells[7][7 - i].figure = new Knight(Colors.WHITE)
      }
      else if (i === 2) {
        this.cells[0][i].figure = new Bishop(Colors.BLACK);
        this.cells[0][7 - i].figure = new Bishop(Colors.BLACK);
        this.cells[7][i].figure = new Bishop(Colors.WHITE);
        this.cells[7][7 - i].figure = new Bishop(Colors.WHITE);
      }
      else if (i === 3) {
        this.cells[0][i].figure = new King(Colors.BLACK);
        this.cells[7][i].figure = new King(Colors.WHITE);
      }
      else if (i === 4) {
        this.cells[0][i].figure = new Queen(Colors.BLACK);
        this.cells[7][i].figure = new Queen(Colors.WHITE);
      }
    }
    this.cells[3][1].figure = new Queen(Colors.BLACK)
    // this.cells[3][1].figure = new Pawn(Colors.BLACK)
    this.cells[2][6].figure = new Pawn(Colors.WHITE)
  }
  getBoardCopy(): Board {
    const newBoard: Board = cloneDeep(this);
    return newBoard
  }
  exchangePawn(x: number, y: number, figureName: FiguresNames, figureColor: Colors) {
    const copyBoard: Board = this.getBoardCopy();
    switch (figureName) {
      case FiguresNames.BISHOP:
        copyBoard.cells[x][y].figure = new Bishop(figureColor);
        break;
      case FiguresNames.ROOK:
        copyBoard.cells[x][y].figure = new Rook(figureColor);
        break;
      case FiguresNames.KNIGHT:
        copyBoard.cells[x][y].figure = new Knight(figureColor);
        break;
      case FiguresNames.QUEEN:
        copyBoard.cells[x][y].figure = new Queen(figureColor);
        break;
    }
    return copyBoard
  }

  isMate(color: Colors, kingX: number, kingY: number) {
    const copyBoard = this.getBoardCopy();
    for (let i = 0; i < copyBoard.cells.length; i++) {
      const row = copyBoard.cells[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        if (cell.figure?.color !== color) {
          cell.figure?.canMove(copyBoard, cell.x, cell.y);
          if (copyBoard.cells[kingX][kingY].isAvailableForMove) {
            return true
          }
        }
      }
    }
    return false
  }
  isCheck(targetCell: Cell, color: Colors, kingsPositions: KingsPositions) {
    const enemyKingColor = color;
    const enemyKingX = kingsPositions[enemyKingColor].x;
    const enemyKingY = kingsPositions[enemyKingColor].y;
    const copyBoard = this.getBoardCopy();
    copyBoard.cells[targetCell.x][targetCell.y].figure?.canMove(copyBoard, targetCell.x, targetCell.y)
    if (copyBoard.cells[enemyKingX][enemyKingY].isAvailableForMove) {
      return true
    }
    return false
  }
  isCheckMate(targetCell: Cell, kingsPositions: KingsPositions, currentPlayer: string) {
    const {x, y} = targetCell;
    const kingPosition = kingsPositions[currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE];
    if (x === kingPosition.x) {
      const copyBoard1 = this.getBoardCopy();
      const copyBoard2 = this.getBoardCopy();
      for (let a = 0; a < this.cells.length; a++) {
        const row = copyBoard1.cells[a];
        for (let b = 0; b < row.length; b++) {
          const cell = row[b];
          if (cell.figure?.color !== currentPlayer && cell.figure?.name !== FiguresNames.KING) {
            cell.figure?.canMove(copyBoard1, cell.x, cell.y);
            if (kingPosition.y - y > 0) {
              for (let i = y; i < kingPosition.y; i++) {
                if (copyBoard1.cells[x][i].isAvailableForMove) {
                  return false
                }
              }
            }
            if (kingPosition.y - y < 0) {
              for (let i = kingPosition.y; i < y; i++) {
                if (copyBoard1.cells[x][i].isAvailableForMove) {
                  return false
                }
              }
            }
          }
          else if (cell.figure.color === currentPlayer) {
            copyBoard2.cells[a][b].figure?.canMove(copyBoard2, copyBoard2.cells[a][b].x, copyBoard2.cells[a][b].y)
          }
        }
      }
    }
    if (y === kingPosition.y) {
      const copyBoard1 = this.getBoardCopy();
      const copyBoard2 = this.getBoardCopy();
      for (let a = 0; a < this.cells.length; a++) {
        const row = copyBoard1.cells[a];
        for (let b = 0; b < row.length; b++) {
          const cell = row[b];
          if (cell.figure?.color !== currentPlayer && cell.figure?.name !== FiguresNames.KING) {
            cell.figure?.canMove(copyBoard1, cell.x, cell.y);
            if (kingPosition.x - x > 0) {
              for (let i = x; i < kingPosition.x; i++) {
                if (copyBoard1.cells[i][y].isAvailableForMove) {
                  return false
                }
              }
            }
            if (kingPosition.x - x < 0) {
              for (let i = kingPosition.x; i < x; i++) {
                if (copyBoard1.cells[i][y].isAvailableForMove) {
                  return false
                }
              }
            }
          }
          else if (cell.figure.color === currentPlayer) {
            copyBoard2.cells[a][b].figure?.canMove(copyBoard2, copyBoard2.cells[a][b].x, copyBoard2.cells[a][b].y)
          }

        }
      }
    }
    if (x !== kingPosition.x && y !== kingPosition.y) {
      const copyBoard1 = this.getBoardCopy();
      const copyBoard2 = this.getBoardCopy();
      for (let a = 0; a < this.cells.length; a++) {
        const row = copyBoard1.cells[a];
        for (let b = 0; b < row.length; b++) {
          const cell = row[b];
          if (cell.figure?.color !== currentPlayer && cell.figure?.name !== FiguresNames.KING) {
            cell.figure?.canMove(copyBoard1, cell.x, cell.y);
            if (kingPosition.y > y && kingPosition.x > x ) {
              for (let i = y, j = x; i < kingPosition.y; i++, j++) {
                if (copyBoard1.cells[j][i].isAvailableForMove) {
                  return false
                }
              }
            }
            if (kingPosition.y > y && kingPosition.x < x) {
              for (let i = y, j = x; i < kingPosition.y; i++, j--) {
                if (copyBoard1.cells[j][i].isAvailableForMove) {
                  return false
                }
              }
            }
            if (kingPosition.y < y && kingPosition.x > x) {
              for (let i = y, j = x; i < kingPosition.y; i--, j++) {
                if (copyBoard1.cells[j][i].isAvailableForMove) {
                  return false
                }
              }
            }
            if (kingPosition.y < y && kingPosition.x < x) {
              for (let i = y, j = x; i < kingPosition.y; i--, j--) {
                if (copyBoard1.cells[j][i].isAvailableForMove) {
                  return false
                }
              }
            }
          }
          else if (cell.figure.color === currentPlayer) {
            copyBoard2.cells[a][b].figure?.canMove(copyBoard2, copyBoard2.cells[a][b].x, copyBoard2.cells[a][b].y)
          }
        }
      }
      if (this.isKingCanGoFromMate(copyBoard2, kingPosition.x, kingPosition.y, currentPlayer)) {
        return false
      }
    }
    return true
  }
  private isKingCanGoFromMate(board: Board, kingPositionX: number, kingPositionY: number, currentPlayer: string): boolean {
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
    for (let [dx, dy] of moveSteps) {
      if (board.cells?.[kingPositionX +dx]?.[kingPositionY + dy].figure === null) {
        if (board.cells[kingPositionX +dx][kingPositionY + dy].isAvailableForMove === false) {
          return true;
        }
      }
      else if (board.cells?.[kingPositionX +dx]?.[kingPositionY + dy].figure) {
        if (board.cells?.[kingPositionX +dx]?.[kingPositionY + dy].figure?.color === currentPlayer) {
          return true
        }
      }
    }
    return false
  }
}