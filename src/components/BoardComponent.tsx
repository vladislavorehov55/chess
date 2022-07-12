import {Board} from '../models/Board';
import {FC, Fragment, useEffect, useRef, useState} from 'react';
import CellComponent from './CellComponent';
import {Cell} from '../models/Cell';
import {Colors, FiguresNames} from '../utils/enums';

interface IBoardProps {
  board: Board
  setBoard: (newBoard: Board) => void
  currentPlayer: string
  setCurrentPlayer: (nextPlayer: string) => void
}

type KingsPositions = {
  white: {
    x: number
    y: number
  }
  black: {
    x: number
    y: number
  }
}

const BoardComponent: FC<IBoardProps> = ({board, setBoard, currentPlayer, setCurrentPlayer}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

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
  const isCheckMate = (targetCell: Cell, board: Board) => {
    console.log('thththrth')
    const {x, y} = targetCell;
    const kingPosition = kingsPositions.current[currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE];
    if (x === kingPosition.x) {
      console.log('1')
      const copyBoard1 = board.getBoardCopy();
      const copyBoard2 = board.getBoardCopy();
      for (let a = 0; a < board.cells.length; a++) {
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
      console.log('2')
      const copyBoard1 = board.getBoardCopy();
      const copyBoard2 = board.getBoardCopy();
      for (let a = 0; a < board.cells.length; a++) {
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
      console.log('3')
      const copyBoard1 = board.getBoardCopy();
      const copyBoard2 = board.getBoardCopy();
      for (let a = 0; a < board.cells.length; a++) {
        const row = copyBoard1.cells[a];
        for (let b = 0; b < row.length; b++) {
          const cell = row[b];
          if (cell.figure?.color !== currentPlayer && cell.figure?.name !== FiguresNames.KING) {
            cell.figure?.canMove(copyBoard1, cell.x, cell.y);
            if (kingPosition.y > y && kingPosition.x > x ) {
              for (let i = y, j = x; i < kingPosition.y; i++, j++) {
                if (copyBoard1.cells[j][i].isAvailableForMove) {
                  console.log(copyBoard1.cells[j][i])
                  console.log('4')
                  return false
                }
              }
            }
            if (kingPosition.y > y && kingPosition.x < x) {
              for (let i = y, j = x; i < kingPosition.y; i++, j--) {
                if (copyBoard1.cells[j][i].isAvailableForMove) {
                  console.log('5')
                  return false
                }
              }
            }
            if (kingPosition.y < y && kingPosition.x > x) {
              for (let i = y, j = x; i < kingPosition.y; i--, j++) {
                if (copyBoard1.cells[j][i].isAvailableForMove) {
                  console.log('6')

                  return false
                }
              }
            }
            if (kingPosition.y < y && kingPosition.x < x) {
              for (let i = y, j = x; i < kingPosition.y; i--, j--) {
                if (copyBoard1.cells[j][i].isAvailableForMove) {
                  console.log('7')
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
      if (isKingCanGoFromMate(copyBoard2, kingPosition.x, kingPosition.y)) {
        return false
      }
    }
    return true
  }
  const isKingCanGoFromMate = (board: Board, kingPositionX: number, kingPositionY: number) => {
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
  }
  const isCheck = (selectedCell: Cell | null, targetCell: Cell, color: Colors) => {
    if (selectedCell?.figure) {
      const enemyKingColor = color;
      const enemyKingX = kingsPositions.current[enemyKingColor].x;
      const enemyKingY = kingsPositions.current[enemyKingColor].y;

      const copyBoard = board.getBoardCopy();
      selectedCell.figure?.canMove(copyBoard, targetCell.x, targetCell.y);

      if (copyBoard.cells[enemyKingX][enemyKingY].isAvailableForMove) {
        return true
      }
    }
    return false
  }
  const isMate = (color: Colors, board: Board) => {
    const copyBoard = board.getBoardCopy();
    const kingX = kingsPositions.current[color].x;
    const kingY = kingsPositions.current[color].y;
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
  const updateBoard = (newBoard: Board) => {
    setBoard(newBoard);
  }

  const moveFigure = (targetCell: Cell) => {
    let copyBoard = board.getBoardCopy();
    selectedCell?.figure?.move(copyBoard, selectedCell, targetCell);
    // если фигура - король, то изменяем его координаты
    if (selectedCell?.figure?.name === FiguresNames.KING) {
      setKingsPosition(selectedCell?.figure?.color, targetCell.x, targetCell.y);
    }
    copyBoard = cancelHighlightCells(copyBoard);
    if (isMate(currentPlayer === Colors.WHITE ? Colors.WHITE : Colors.BLACK, copyBoard)) {

      alert(`Мат игроку ${currentPlayer === Colors.WHITE ? Colors.WHITE : Colors.BLACK}`)
    }
      // else if (isCheck(selectedCell, targetCell, currentPlayer === Colors.WHITE ? Colors.WHITE : Colors.BLACK)) {
      //   alert(`Шах игроку ${currentPlayer === Colors.WHITE ? Colors.WHITE : Colors.BLACK}`)
    // }
    else if (isCheck(selectedCell, targetCell, currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE)) {
      if (isCheckMate(targetCell, copyBoard)) {
        alert('Шах и мат')
        return
      }
      alert(`Шах игроку ${currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE}`)
    }
    updateBoard(copyBoard);
    setSelectedCell(null);
    setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
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
        // выбрали клетку, затем нажали на клетку, на которой есть фигуру, но на нее нельзя ходить
        if (!cell.isAvailableForMove) {
          // cancelHighlightCells(board)
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
    return copyBoard
    // updateBoard(copyBoard)
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