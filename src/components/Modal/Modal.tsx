import React, {FC} from 'react';
interface IProps {
  children: React.ReactNode;
  closeFormChooseFigure: (e: React.MouseEvent) => void
}
const Modal: FC<IProps> = (props) => {
  return (
    <div className='modal' onClick={props.closeFormChooseFigure}>
      {
        props.children
      }
    </div>
  );
};

export default Modal;