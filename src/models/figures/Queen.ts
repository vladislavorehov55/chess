import {Figures} from './Figures';
import {Colors, FiguresNames} from '../../utils/enums';
import whiteQueenLogo from '../../assets/white-queen.png';
import blackQueenLogo from '../../assets/black-queen.png'

export class Queen extends Figures {
  constructor(color: Colors) {
    super(FiguresNames.QUEEN, color,color === Colors.WHITE ? whiteQueenLogo : blackQueenLogo);
  }
}