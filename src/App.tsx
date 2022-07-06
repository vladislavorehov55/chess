import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import {Board} from './models/Board';
import LostFigures from './components/LostFigures';

function App() {
  const [board, setBoard] = useState(new Board());
  const [currentPlayer, setCurrentPlayer] = useState('white');


  useEffect(() => {
    const newBoard = new Board();
    newBoard.initCells();
    setBoard(newBoard);
  }, [])
  return (
    <div className="app">
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
