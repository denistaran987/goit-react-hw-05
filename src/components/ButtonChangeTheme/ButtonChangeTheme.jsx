import { useState } from 'react';
import s from './ButtonChangeTheme.module.css';

const ButtonChangeTheme = () => {
  const [isRight, setIsRight] = useState(false);

  const handleClick = () => {
    setIsRight(prevState => !prevState);
    document.body.classList.toggle('dark-theme');
  };

  return (
    <button
      className={`${s['btn-header']} ${isRight ? `${s.right}` : ''}`}
      id="btn-header"
      onClick={handleClick}
    >
      <span className={s.circle} id="header-mob-span"></span>
    </button>
  );
};
export default ButtonChangeTheme;
