import { useEffect, useState } from 'react';
import s from './ButtonChangeTheme.module.css';

const ButtonChangeTheme = () => {
  const [isRight, setIsRight] = useState(() =>
    JSON.parse(localStorage.getItem('darktheme') ?? false)
  );

  useEffect(() => {
    localStorage.setItem('darktheme', JSON.stringify(isRight));
    if (isRight) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isRight]);

  const handleClick = () => {
    setIsRight(prevState => !prevState);
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
