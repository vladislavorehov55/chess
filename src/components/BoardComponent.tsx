import {Board} from '../models/Board';
import React, {FC, Fragment, useEffect, useRef} from 'react';
import CellComponent from './CellComponent';
import {Cell} from '../models/Cell';
import {Colors, FiguresNames} from '../utils/enums';

interface IProps {
  board: Board
  setBoard: (newBoard: Board) => void
  currentPlayer: string
  setCurrentPlayer: (nextPlayer: string) => void
  selectedCell: Cell | null
  setSelectedCell: (cell: Cell | null) => void
  setIsOpenedModalForm: (flag: boolean) => void
  targetCellRef: React.MutableRefObject<Cell | null>
  setAlertText: (text: string) => void
}

export type KingsPositions = {
  white: {
    x: number
    y: number
  }
  black: {
    x: number
    y: number
  }
}

const BoardComponent: FC<IProps> = (props) => {
  const {
    board, setBoard, currentPlayer, setCurrentPlayer, selectedCell, setSelectedCell,
    setIsOpenedModalForm, targetCellRef, setAlertText
  } = props;
  const kingsPositions = useRef<KingsPositions>({
    white: {
      x: 7,
      y: 3,
    },
    black: {
      x: 0,
      y: 3
    }
  })

  const setKingsPosition = (color: Colors, x: number, y: number) => {
    kingsPositions.current[color] = {x, y};
  }
  const updateBoard = (newBoard: Board) => {
    setBoard(newBoard);
  }
  const isPawnInBoardEnd = (cell: Cell | null, targetCell: Cell) => {
    if (cell?.figure?.name === FiguresNames.PAWN) {
      if (cell.figure.color === Colors.WHITE) {
        if (targetCell.x === 0) {
          targetCellRef.current = targetCell;
          return true
        }
      }
      if (cell.figure.color === Colors.BLACK) {
        if (targetCell.x === 7) {
          targetCellRef.current = targetCell;
          return true
        }
      }
    }
  }
  const moveFigure = (targetCell: Cell) => {
    let copyBoard = board.getBoardCopy();
    selectedCell?.figure?.move(copyBoard, selectedCell, targetCell);
    // если фигура - король, то изменяем его координаты
    if (selectedCell?.figure?.name === FiguresNames.KING) {
      setKingsPosition(selectedCell?.figure?.color, targetCell.x, targetCell.y);
    }
    copyBoard = cancelHighlightCells(copyBoard);
    let color = currentPlayer === Colors.WHITE ? Colors.WHITE : Colors.BLACK
    if (copyBoard.isMate(color, kingsPositions.current[color].x, kingsPositions.current[color].y)) {
      setAlertText(`Такой ход приведет к мату`);
      return
    } else if (copyBoard.isCheck(selectedCell, targetCell, currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE, kingsPositions.current)) {
      if (copyBoard.isCheckMate(targetCell, kingsPositions.current, currentPlayer)) {
        setAlertText('Шах и мат');
      } else {
        setAlertText(`Шах игроку ${currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE}`)
      }
    }
    if (isPawnInBoardEnd(selectedCell, targetCell)) {
      setIsOpenedModalForm(true);
    } else {
      setCurrentPlayer(currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE);
    }
    updateBoard(copyBoard);
    setSelectedCell(null);
  }

  const selectCell = (cell: Cell) => {
    if (selectedCell) {
      /// выбрали клетку и нажали на пустую клетку
      if (cell.figure === null) {
        if (!cell.isAvailableForMove) {
          // cancelHighlightCells(board)
          updateBoard(cancelHighlightCells(board))
          setSelectedCell(null)
          return
        }
        if (cell.isAvailableForMove) {
          moveFigure(cell);
          return
        }

      }
      // выбрали клетку и нажали на нее же
      if (selectedCell.x === cell.x && selectedCell.y === cell.y) {
        // cancelHighlightCells(board)
        updateBoard(cancelHighlightCells(board))
        setSelectedCell(null)
        return
      }
      if (cell.figure) {
        // выбрали клетку, затем нажали на клетку, на которой есть фигура, но на нее нельзя ходить
        if (!cell.isAvailableForMove) {
          // cancelHighlightCells(board)
          if (cell.figure.color !== currentPlayer) {
            return
          }
          updateBoard(cancelHighlightCells(board))
          setSelectedCell(cell)
          return
        }
        if (cell.isAvailableForMove) {
          moveFigure(cell);
          return
        }
      }
      if (cell.figure) {
        // cancelHighlightCells(board);
        updateBoard(cancelHighlightCells(board))
        setSelectedCell(cell);
        return
      }

    }
    if (cell.figure) {
      if (cell.figure.color !== currentPlayer) {
        setAlertText('Нельзя ходить чужими фигурами')
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
    return copyBoard
    // updateBoard(copyBoard)
  }


  useEffect(() => {
    if (selectedCell) {
      highlightCells()
    }
  }, [selectedCell])


  return (
    <div>
      <div className='board'>
        {
          board.cells.map((row, index) => {
            return (
              <div key={index} className='board__row'>
                {8 - index}
                {
                  row.map((cell, ind) => <CellComponent cell={cell}
                                                        selectedCell={selectedCell}
                                                        selectCell={selectCell}
                                                        key={ind}
                  />)
                }
              </div>
            )
          })
        }
        <div className='board__row'>
          {
            ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(item => <div className='character'>{item}</div>)
          }
        </div>
      </div>

    </div>
  )
}
export default BoardComponent