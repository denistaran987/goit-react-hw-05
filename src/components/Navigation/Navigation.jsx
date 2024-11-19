import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };
  return (
    <nav className={s.nav}>
      <NavLink className={buildLinkClass} to={'/'}>
        Home
      </NavLink>
      <NavLink className={buildLinkClass} to={'/movies'}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
