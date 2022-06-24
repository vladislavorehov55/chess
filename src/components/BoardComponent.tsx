import {Board} from '../models/Board';
import {FC, Fragment, useEffect, useState} from 'react';
import CellComponent from './CellComponent';
import {Cell} from '../models/Cell';

interface IBoardProps {
  board: Board
  updateBoard: (newBoard: Board) => void
}

const BoardComponent: FC<IBoardProps> = ({board, updateBoard}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const selectCell = (cell: Cell) => {
    if (cell.figure) {
      const isEqual = cell === selectedCell;
      const newBoard: Board = board.getBoardCopy();
      if (!isEqual) {
        console.log('isEqual', isEqual)
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