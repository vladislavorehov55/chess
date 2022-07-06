import {Board} from '../models/Board';
import {FC, Fragment, useEffect, useState} from 'react';
import CellComponent from './CellComponent';
import {Cell} from '../models/Cell';

interface IBoardProps {
  board: Board
  setBoard: (newBoard: Board) => void
  currentPlayer: string
  setCurrentPlayer: (nextPlayer: string) => void
}

const BoardComponent: FC<IBoardProps> = ({board, setBoard, currentPlayer, setCurrentPlayer}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const updateBoard = (newBoard: Board) => {
    setBoard(newBoard);
  }


  const selectCell = (cell: Cell) => {
    if (selectedCell) {
      /// выбрали клетку и нажали на пустую клетку
      if (cell.figure === null) {
        if (!cell.isAvailableForMove) {
          cancelHighlightCells(board)
          setSelectedCell(null)
          return
        }
        if (cell.isAvailableForMove) {
          const copyBoard = board.getBoardCopy();
          selectedCell?.figure?.move(copyBoard, selectedCell, cell);
          cancelHighlightCells(copyBoard)
          setSelectedCell(null);
          setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white')
          return
        }

      }
      // выбрали клетку и нажали на нее же
      if (selectedCell.x === cell.x && selectedCell.y === cell.y) {
        cancelHighlightCells(board)
        setSelectedCell(null)
        return
      }
      if (cell.figure) {
        // выбрали клетку, затем нажали на клетку, на которой есть фигуру, но на нее нельзя ходить
        if (!cell.isAvailableForMove) {
          cancelHighlightCells(board)
          setSelectedCell(cell)
          return
        }
        if (cell.isAvailableForMove) {
          const copyBoard = board.getBoardCopy();
          selectedCell?.figure?.move(copyBoard, selectedCell, cell);
          cancelHighlightCells(copyBoard)
          setSelectedCell(null);
          setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white')
          return
        }
      }
      if (cell.figure) {
        cancelHighlightCells(board);
        setSelectedCell(cell);
        return
      }

    }
    if (cell.figure) {
      if (cell.figure.color !== currentPlayer) {
        alert('Нельзя ходить чужими фигурами')
        return
      }
      setSelectedCell(cell)
    }
  }

  const highlightCells = () => {
    const copyBoard = board.getBoardCopy()
    selectedCell?.figure?.canMove(copyBoard, selectedCell.x, selectedCell.y);
    updateBoard(copyBoard)
  }

  const cancelHighlightCells = (board: Board) => {
    const copyBoard: Board = board.getBoardCopy();
    for (let row of copyBoard.cells) {
      for (let cell of row) {
        cell.isAvailableForMove = false;
      }
    }
    updateBoard(copyBoard)
  }

  useEffect(() => {
    if (selectedCell) {
      highlightCells()
    }
  }, [selectedCell])


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