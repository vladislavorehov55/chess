import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import {Board} from './models/Board';

function App() {
  const [board, setBoard] = useState(new Board());
  const [currentPlayer, setCurrentPlayer] = useState('white')

  useEffect(() => {
    const newBoard = new Board();
    newBoard.initCells();
    setBoard(newBoard);
  }, [])

  const updateBoard = (newBoard: Board) => {
    setBoard(newBoard)
  }


  return (
    <div className="app">
      <BoardComponent board={board}
                      updateBoard={updateBoard}
                      currentPlayer={currentPlayer}
      />
      <div>
        dsfv
      </div>
    </div>
  );
}

export default App;
