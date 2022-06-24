import {Cell} from '../models/Cell';
import {FC} from 'react';

interface ICellsProps {
  cell: Cell
  selectedCell: Cell | null
  selectCell: (cell: Cell) => void
}
const CellComponent: FC<ICellsProps> = ({cell, selectedCell, selectCell}) => {
  const isSelected = selectedCell?.x === cell.x && selectedCell?.y === cell.y || cell.isAvailableForMove ? 'selectedCell' : '';

  const onClickCell = () => {
    selectCell(cell);
  }
  return (
    <div className={`cell ${cell.color} ${isSelected}`}
         onClick={onClickCell}
    >
      {
        cell.figure?.logo && <img src={cell.figure.logo} alt='figure'/>
      }
    </div>
  )
}
export default CellComponent