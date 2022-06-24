import {Figures} from './Figures';
import {Colors, FiguresNames} from '../../utils/enums';
import whiteKnightLogo from '../../assets/white-knight.png';
import blackKnightLogo from '../../assets/black-knight.png'

export class Knight extends Figures {
  constructor(color: Colors) {
    super(FiguresNames.KNIGHT, color,color === Colors.WHITE ? whiteKnightLogo : blackKnightLogo);
  }
}