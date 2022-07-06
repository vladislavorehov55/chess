import {Cell} from '../models/Cell';
import {FC} from 'react';

interface ICellsProps {
  cell: Cell
  selectedCell: Cell | null
  selectCell: (cell: Cell) => void
}
const CellComponent: FC<ICellsProps> = ({cell, selectedCell, selectCell}) => {
  const isSelected = selectedCell?.x === cell.x && selectedCell?.y === cell.y ? 'selectedCell' : '';
  const canBeEaten = cell.isAvailableForMove && cell.figure ? 'canBeEaten' : ''
  const onClickCell = () => {
    selectCell(cell);
  }
  return (
    <div className={`cell ${cell.color} ${isSelected} ${canBeEaten}`}
         onClick={onClickCell}
    >
      {
        !cell.figure && cell.isAvailableForMove && <div className='available'/>
      }
      {
        cell.figure?.logo && <img src={cell.figure.logo} alt='figure'/>
      }
    </div>
  )
}
export default CellComponent