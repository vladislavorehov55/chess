import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import {Board} from './models/Board';
import LostFigures from './components/LostFigures';
import Modal from './components/Modal/Modal';
import FormChooseFigure from './components/FormChooseFigure';
import {Cell} from './models/Cell';
import {FiguresNames} from './utils/enums';

function App() {
  const [board, setBoard] = useState(new Board());
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [isOpenedModalForm, setIsOpenedModalForm] = useState(true);


  const closeFormChooseFigure = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpenedModalForm(false)
  }

  useEffect(() => {
    const newBoard = new Board();
    newBoard.initCells();
    setBoard(newBoard);
  }, [])
  const exchangePawn = (newFigure: FiguresNames, cell: Cell) => {
  }
  return (
    <div className="app">
      {
        isOpenedModalForm &&
        <Modal closeFormChooseFigure={closeFormChooseFigure}>
          <FormChooseFigure closeFormChooseFigure={closeFormChooseFigure}/>
        </Modal>
      }
      <h3>Сейчас ходят: {currentPlayer}</h3>
      <div className='main'>
        <BoardComponent board={board}
                        setBoard={setBoard}
                        currentPlayer={currentPlayer}
                        setCurrentPlayer={setCurrentPlayer}
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
