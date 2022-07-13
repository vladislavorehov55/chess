import React, {FC} from 'react';
import {FiguresNames} from '../utils/enums';
import {Cell} from '../models/Cell';
interface IProps {
  closeFormChooseFigure: (e: React.MouseEvent) => void
  exchangePawn: (newFigureName: FiguresNames) => void
}

const FormChooseFigure: FC<IProps> = ({closeFormChooseFigure, exchangePawn}) => {
  const clickHandler = (e: React.MouseEvent<HTMLUListElement>) => {
    e.stopPropagation();
    const target = e.target as  HTMLUListElement;
    exchangePawn(target.textContent as FiguresNames)
  }
  return (
    <div className='formChoose modal__formChoose'
         onClick={e => e.stopPropagation()}
    >
      <div className='close' onClick={closeFormChooseFigure}>&times;</div>
      <ul className='formChoose__list'
          onClick={clickHandler}
      >
        <li>{FiguresNames.QUEEN}</li>
        <li>{FiguresNames.KNIGHT}</li>
        <li>{FiguresNames.ROOK}</li>
        <li>{FiguresNames.BISHOP}</li>
      </ul>
    </div>
  );
};

export default FormChooseFigure;