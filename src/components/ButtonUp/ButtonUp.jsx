import s from './ButtonUp.module.css';
import { PiArrowFatUpFill } from 'react-icons/pi';

const ButtonUp = () => {
  return (
    <a href="#header" className={s.button}>
      <PiArrowFatUpFill />
    </a>
  );
};
export default ButtonUp;
