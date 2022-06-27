import {Board} from '../models/Board';
import {FC, Fragment, useState} from 'react';
import CellComponent from './CellComponent';
import {Cell} from '../models/Cell';

interface IBoardProps {
  board: Board
  updateBoard: (newBoard: Board) => void
  currentPlayer: string
}

const BoardComponent: FC<IBoardProps> = ({board, updateBoard, currentPlayer}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);


  const selectCell = (cell: Cell) => {
    if (cell.figure && cell.figure.color !== currentPlayer && (selectedCell === null || selectedCell)) return
    /// ест фигуру
    if (selectedCell && selectedCell?.figure?.color !== cell.figure?.color && cell.isAvailableForMove) {
      const newBoard: Board = board.getBoardCopy();
      newBoard.cells[cell.x][cell.y].figure = selectedCell.figure;
      newBoard.cells[selectedCell.x][selectedCell.y].figure = null;
      for (let row of newBoard.cells) {
        for (let cell of row) {
          cell.isAvailableForMove = false;
        }
      }
      updateBoard(newBoard)
      setSelectedCell(null);
      return
    }
    if (cell.figure) {
      /// Отключает выделение клетки по второму клику
      if (cell.x === selectedCell?.x && cell.y === selectedCell?.y) {
        const newBoard: Board = board.getBoardCopy();
        for (let row of newBoard.cells) {
          for (let cell of row) {
            cell.isAvailableForMove = false;
          }
        }
        setSelectedCell(null)
        updateBoard(newBoard)
        return
      }
      /// Отключаем возможные ходы при нажатии на другую фигуру
      const newBoard: Board = board.getBoardCopy();
      for (let row of newBoard.cells) {
        for (let cell of row) {
          cell.isAvailableForMove = false;
        }
      }
      cell.figure.canMove(newBoard, cell.x, cell.y);
      updateBoard(newBoard);
      setSelectedCell(cell)
    }
    else if (cell.figure === null && selectedCell) {
      if (cell.isAvailableForMove) {
        const newBoard: Board = board.getBoardCopy();
        newBoard.cells[cell.x][cell.y].figure = selectedCell?.figure;
        newBoard.cells[selectedCell.x][selectedCell.y].figure = null;
        for (let row of newBoard.cells) {
          for (let cell of row) {
            cell.isAvailableForMove = false;
          }
        }
        updateBoard(newBoard);
        setSelectedCell(null);
      }
      else if (!cell.isAvailableForMove) {
        const newBoard: Board = board.getBoardCopy();
        for (let row of newBoard.cells) {
          for (let cell of row) {
            cell.isAvailableForMove = false;
          }
        }
        setSelectedCell(null)
        updateBoard(newBoard)
      }
    }
  }


  return (
    <div className='board'>
      {
        board.cells.map((row, index) => {
          return (
            <Fragment key={index}>
              {
                row.map((cell, ind) => <CellComponent cell={cell}
                                                      selectedCell={selectedCell}
                                                      selectCell={selectCell}
                                                      key={ind}
                />)
              }
            </Fragment>
          )
        })
      }

    </div>
  )
}
export default BoardComponent