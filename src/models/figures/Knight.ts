import {Figures} from './Figures';
import {Colors, FiguresNames} from '../../utils/enums';
import whiteKnightLogo from '../../assets/white-knight.png';
import blackKnightLogo from '../../assets/black-knight.png'
import {Board} from '../Board';
import {Cell} from '../Cell';

export class Knight extends Figures {
  constructor(color: Colors) {
    super(FiguresNames.KNIGHT, color, color === Colors.WHITE ? whiteKnightLogo : blackKnightLogo);
  }
}