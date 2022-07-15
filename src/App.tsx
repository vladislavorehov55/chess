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

function App() {
  const [board, setBoard] = useState(new Board());
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [isOpenedModalForm, setIsOpenedModalForm] = useState(false);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [alertText, setAlertText] = useState('');


  const closeFormChooseFigure = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpenedModalForm(false)
  }

  useEffect(() => {
    const newBoard = new Board();
    newBoard.initCells();
    setBoard(newBoard);
  }, [])

  const targetCellRef = useRef<Cell | null>(null);
  const exchangePawn = (newFigureName: FiguresNames) => {
    const newBoard = board.exchangePawn(targetCellRef.current?.x as number, targetCellRef.current?.y as number, newFigureName,
      currentPlayer as Colors);
    setBoard(newBoard);
    setIsOpenedModalForm(false);
    setCurrentPlayer(currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE);
  }
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
