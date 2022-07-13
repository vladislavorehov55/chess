import React, {FC} from 'react';
import {FiguresNames} from '../utils/enums';
interface IProps {
  closeFormChooseFigure: (e: React.MouseEvent) => void
}
const FormChooseFigure: FC<IProps> = ({closeFormChooseFigure}) => {
  return (
    <div className='formChoose modal__formChoose'
         onClick={e => e.stopPropagation()}
    >
      <div className='close' onClick={closeFormChooseFigure}>&times;</div>
      <ul className='formChoose__list'>
        <li>{FiguresNames.QUEEN}</li>
        <li>{FiguresNames.KNIGHT}</li>
        <li>{FiguresNames.ROOK}</li>
        <li>{FiguresNames.BISHOP}</li>
      </ul>
    </div>
  );
};

export default FormChooseFigure;