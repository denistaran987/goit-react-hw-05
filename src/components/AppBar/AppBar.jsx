import Navigation from '../Navigation/Navigation';
import s from './AppBar.module.css';
const AppBar = () => {
  return (
    <header id="header" className={s.header}>
      <Navigation />
    </header>
  );
};

export default AppBar;
