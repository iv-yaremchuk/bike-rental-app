import styled from './Header.module.css';
import Menu from './Menu/Menu';
import { NavLink } from 'react-router-dom';

function Header() {
  const setLinkActive = ({ isActive }) =>
  isActive
    ? styled.link + ' ' + styled.active
    : styled.link;
  return (
    <header className={styled.header}>
      <NavLink className={setLinkActive} to='/'>
        <h1 className={styled.title}>Bike rental</h1>
      </NavLink>
      <Menu />
    </header>
  );
}

export default Header;
