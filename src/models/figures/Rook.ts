import {Figures} from './Figures';
import {Colors, FiguresNames} from '../../utils/enums';
import whiteRookLogo from '../../assets/white-rook.png';
import blackRookLogo from '../../assets/black-rook.png'

export class Rook extends Figures {
  constructor(color: Colors) {
    super(FiguresNames.ROOK, color,color === Colors.WHITE ? whiteRookLogo : blackRookLogo);
  }
}