import {Board} from '../models/Board';
import {FC, Fragment, useState} from 'react';
import CellComponent from './CellComponent';
import {Cell} from '../models/Cell';

interface IBoardProps {
  board: Board
  updateBoard: (newBoard: Board) => void
}

const BoardComponent: FC<IBoardProps> = ({board, updateBoard}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const selectCell = (cell: Cell) => {
    if (cell.x === selectedCell?.x && cell.y === selectedCell?.y) {
      const newBoard: Board = board.getBoardCopy();
      for (let row of newBoard.cells) {
        for (let cell of row) {
          cell.isAvailableForMove = false;
        }
      }
      updateBoard(newBoard)
      setSelectedCell(null);
    }
    if (cell.figure) {
      console.log('1')
      const isEqual = cell === selectedCell;
      const newBoard: Board = board.getBoardCopy();
      if (!isEqual) {
        for (let row of newBoard.cells) {
          for (let cell of row) {
            cell.isAvailableForMove = false;
          }
        }
      }
      cell.figure.canMove(newBoard, cell.x, cell.y);
      updateBoard(newBoard);
      setSelectedCell(cell !== selectedCell ? cell : null);
    }
    else if (!cell.figure && selectedCell) {
      console.log('2')
      if (cell.isAvailableForMove) {
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
      }
      else {
        const newBoard: Board = board.getBoardCopy();
        for (let row of newBoard.cells) {
          for (let cell of row) {
            cell.isAvailableForMove = false;
          }
        }
        updateBoard(newBoard)
        setSelectedCell(null);
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