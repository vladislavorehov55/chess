import {Figures} from './Figures';
import {Colors, FiguresNames} from '../../utils/enums';
import whiteKingLogo from '../../assets/white-king.png';
import blackKingLogo from '../../assets/black-king.png'

export class King extends Figures {
  constructor(color: Colors) {
    super(FiguresNames.KING, color,color === Colors.WHITE ? whiteKingLogo : blackKingLogo);
  }
}