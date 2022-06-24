import {Figures} from './Figures';
import {Colors, FiguresNames} from '../../utils/enums';
import whiteBishopLogo from '../../assets/white-bishop.png';
import blackBishopLogo from '../../assets/black-bishop.png'

export class Bishop extends Figures {
  constructor(color: Colors) {
    super(FiguresNames.BISHOP, color,color === Colors.WHITE ? whiteBishopLogo : blackBishopLogo);
  }
}