import styled from './Header.module.css';
import Menu from './Menu/Menu';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  const setLinkActive = ({ isActive }) =>
  isActive
    ? styled.link + ' ' + styled.active
    : styled.link;
    const [logoAttr, setLogoAttr] = useState(true);
    const [linkAttr, setLinkAttr] = useState(false);
  return (
    <header className={styled.header}>
      <NavLink className={setLinkActive} to='/' onClick={() => {
        setLogoAttr(true)
        setLinkAttr(false)
      }}
      tabIndex={logoAttr ? -1 : 0}
      >
        <h1 className={styled.title}>Bike rental</h1>
      </NavLink>
      <Menu logoAttr={logoAttr} setLogoAttr={setLogoAttr} linkAttr={linkAttr} setLinkAttr={setLinkAttr} />
    </header>
  );
}

export default Header;
