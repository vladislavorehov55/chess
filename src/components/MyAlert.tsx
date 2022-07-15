import React, {FC} from 'react';
interface IProps {
  text: string
  setAlertText: (text: string) => void
}
const MyAlert: FC<IProps> = ({text, setAlertText}) => {
  return (
    <div className={`myAlert ${text ? 'myAlert_visible' : ''}`}>
      <div className='close' onClick={() => setAlertText('') }>&times;</div>
      {text}
    </div>
  );
};

export default MyAlert;