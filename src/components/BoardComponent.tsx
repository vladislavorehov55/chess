import {Board} from '../models/Board';
import React, {FC, useEffect} from 'react';
import CellComponent from './CellComponent';
import {Cell} from '../models/Cell';
import {Colors, FiguresNames} from '../utils/enums';
import {KingsPositions} from '../App';

interface IProps {
  board: Board
  setBoard: (newBoard: Board) => void
  currentPlayer: Colors
  setCurrentPlayer: (nextPlayer: Colors) => void
  selectedCell: Cell | null
  setSelectedCell: (cell: Cell | null) => void
  setIsOpenedModalForm: (flag: boolean) => void
  targetCellRef: React.MutableRefObject<Cell | null>
  setAlertText: (text: string) => void
  setIsGameEnded: (flag: boolean) => void
  kingsPositions: {
    current: KingsPositions
  }
}


const BoardComponent: FC<IProps> = (props) => {
  const {
    board, setBoard, currentPlayer, setCurrentPlayer, selectedCell, setSelectedCell,
    setIsOpenedModalForm, targetCellRef, setAlertText, setIsGameEnded, kingsPositions
  } = props;

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
    if (copyBoard.isMate(currentPlayer, kingsPositions.current[currentPlayer].x, kingsPositions.current[currentPlayer].y)) {
      setAlertText(`Такой ход приведет к мату`);
      return
    } else if (copyBoard.isCheck(targetCell, currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE, kingsPositions.current)) {
      if (copyBoard.isCheckMate(targetCell, kingsPositions.current, currentPlayer)) {
        setIsGameEnded(true);
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
        updateBoard(cancelHighlightCells(board))
        setSelectedCell(null)
        return
      }
      if (cell.figure) {
        // выбрали клетку, затем нажали на клетку, на которой есть фигура, но на нее нельзя ходить
        if (!cell.isAvailableForMove) {
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
            <div key={index} className='board__row'>
              <span>
                {8 - index}
              </span>
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
          ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((item, ind) => <div key={ind} className='character'>{item}</div>)
        }
      </div>
    </div>
  )
}
export default BoardComponent