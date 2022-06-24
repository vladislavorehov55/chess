import {Cell} from './Cell';
import {Colors} from '../utils/enums';
import {Pawn} from './figures/Pawn';
import {Rook} from './figures/Rook';
import {Knight} from './figures/Knight';
import {Bishop} from './figures/Bishop';
import {King} from './figures/King';
import {Queen} from './figures/Queen';

export class Board {
  cells: Cell[][] = []

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
        this.cells[7][7 - i].figure = new Knight(Colors.WHITE);
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
    this.cells[2][1].figure = new Rook(Colors.WHITE)
    this.cells[5][6].figure = new Pawn(Colors.BLACK)
  }
  getBoardCopy() {
    const newBoard: Board = new Board();
    const newCells: Cell[][] = [];
    for (let row of this.cells) {
      newCells.push([...row])
    }
    newBoard.cells = newCells;
    return newBoard
  }
}