import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import {Board} from './models/Board';
import LostFigures from './components/LostFigures';
import Modal from './components/Modal/Modal';
import FormChooseFigure from './components/FormChooseFigure';
import {Cell} from './models/Cell';
import {Colors, FiguresNames} from './utils/enums';
import MyAlert from './components/MyAlert';
import Congratulations from './components/Congratulations';

function App() {
  const [board, setBoard] = useState(new Board());
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [isOpenedModalForm, setIsOpenedModalForm] = useState(false);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [alertText, setAlertText] = useState('');
  const [isGameEnded, setIsGameEnded] = useState(false);

  const targetCellRef = useRef<Cell | null>(null);

  const closeFormChooseFigure = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpenedModalForm(false)
  }

  const exchangePawn = (newFigureName: FiguresNames) => {
    const newBoard = board.exchangePawn(targetCellRef.current?.x as number, targetCellRef.current?.y as number, newFigureName,
      currentPlayer as Colors);
    setBoard(newBoard);
    setIsOpenedModalForm(false);
    setCurrentPlayer(currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE);
  }

  const restartGame = () => {
    const newBoard: Board = new Board();
    newBoard.initCells();
    setBoard(newBoard)
    setIsGameEnded(false);
  }
  useEffect(() => {
    restartGame()
  }, [])
  return (
    <div className="app">
      <MyAlert text={alertText} setAlertText={setAlertText}/>
      {
        isOpenedModalForm &&
        <Modal closeFormChooseFigure={closeFormChooseFigure}>
          <FormChooseFigure closeFormChooseFigure={closeFormChooseFigure}
                            exchangePawn={exchangePawn}
          />
        </Modal>
      }
      {
        isGameEnded &&
        <Modal>
          <Congratulations
                           currentPlayer={currentPlayer}
                           restartGame={restartGame}
          />
        </Modal>
      }
      <button className='btnRestart app__btnRestart'>Начать заново</button>
      <h3>Сейчас ходят: {currentPlayer}</h3>
      <div className='main'>
        <BoardComponent board={board}
                        setBoard={setBoard}
                        currentPlayer={currentPlayer}
                        setCurrentPlayer={setCurrentPlayer}
                        selectedCell={selectedCell}
                        setSelectedCell={setSelectedCell}
                        setIsOpenedModalForm={setIsOpenedModalForm}
                        targetCellRef={targetCellRef}
                        setAlertText={setAlertText}
                        setIsGameEnded={setIsGameEnded}
        />
        <div className='lostFiguresWrapper'>
          <LostFigures title='Черные' figures={board.blackFiguresLost}/>
          <LostFigures title='Белые' figures={board.whiteFiguresLost}/>
        </div>
      </div>
    </div>
  );
}

export default App;
