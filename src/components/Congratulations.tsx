import React, {FC} from 'react';

interface Iprops {
  currentPlayer: string
  restartGame: () => void
}

const Congratulations: FC<Iprops> = ({currentPlayer, restartGame}) => {
  return (
    <div className='congratulationsBlock modal__congratulationsBlock'>
      <div>Поздравляем, выиграл игрок {currentPlayer}</div>
      <button className='btnRestart congratulationsBlock__btnRestart'
              onClick={restartGame}
      >
        Начать заново
      </button>
    </div>
  );
};

export default Congratulations;