import styled from './Menu.module.css';
import navMenuIconOpened from './nav-menu-icon-opened.svg';
import navMenuIconClosed from './nav-menu-icon-closed.svg';
import signMenuIconOpened from './sign-menu-icon-opened.svg';
import signMenuIconClosed from './sign-menu-icon-closed.svg';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signOut } from '../../../redux/authAction';

function Menu(props) {
  const [active, setActive] = useState(true);
  const { logoAttr, setLogoAttr, linkAttr, setLinkAttr } = props;

  const { isSignedIn } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  const signout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  const setLinkActive = ({ isActive }) =>
    isActive
      ? styled.dropdown_menu__link + ' ' + styled.active
      : styled.dropdown_menu__link;

  return (
    <>
      <div className={styled.menu__wrap}>
        <button
          onClick={() => {
            setActive(!active)
          }}
          className={styled.menu__btn}
        >
          {isSignedIn ? (
            <>
              <img
                src={navMenuIconClosed}
                className={
                  active
                    ? styled.menu__icon + ' ' + styled.active
                    : styled.menu__icon
                }
                alt=""
              />
              <img
                src={navMenuIconOpened}
                className={
                  active
                    ? styled.menu__icon
                    : styled.menu__icon + ' ' + styled.active
                }
                alt=""
              />
            </>
          ) : (
            <>
              <img
                src={signMenuIconClosed}
                className={
                  active
                    ? styled.menu__icon + ' ' + styled.active
                    : styled.menu__icon
                }
                alt=""
              />
              <img
                src={signMenuIconOpened}
                className={
                  active
                    ? styled.menu__icon
                    : styled.menu__icon + ' ' + styled.active
                }
                alt=""
              />
            </>
          )}
        </button>
      </div>
      <nav
        className={
          active
            ? styled.dropdown_menu
            : styled.dropdown_menu + ' ' + styled.active
        }
      >
        {isSignedIn ? (
          <ul className={styled.dropdown_menu__list}>
            <li className={styled.dropdown_menu__item}>
              <NavLink
                onClick={() => {
                  setActive(!active);
                  setLogoAttr(true);
                  setLinkAttr(!linkAttr);
                }}
                onFocus={() => {
                  setActive(false);
                }}
                onBlur={() => {
                  if (linkAttr) {
                    setActive(active);
                  } else {
                    setActive(!active);
                  }
                }}
                className={setLinkActive}
                to="/"
                tabIndex={linkAttr ? -1 : 0}
              >
                Форма
              </NavLink>
            </li>
            <li className={styled.dropdown_menu__item}>
              <NavLink
                onClick={() => {
                  setActive(!active);
                  setLogoAttr(false);
                  setLinkAttr(!linkAttr);
                }}
                onFocus={() => {
                  setActive(false);
                }}
                onBlur={() => {
                  if (linkAttr) {
                    setActive(!active);
                  } else {
                    setActive(active);
                  }
                }}
                className={setLinkActive}
                to="/theftTable"
                tabIndex={!linkAttr ? -1 : 0}
              >
                Таблица
              </NavLink>
            </li>
            <li className={styled.dropdown_menu__item + ' ' + styled.signout}>
              <a
                onClick={() => {
                  setActive(!active);
                  setLogoAttr(false);
                  setLinkAttr(!linkAttr);
                  signout();
                }}
                onFocus={() => {
                  setActive(false);
                }}
                onBlur={() => {
                  setActive(!active);
                }}
                className={styled.dropdown_menu__link + ' ' + styled.signout}
                href="/signIn"
              >
                Выйти
              </a>
            </li>
          </ul>
        ) : (
          <ul className={styled.dropdown_menu__list}>
            <li className={styled.dropdown_menu__item}>
              <NavLink
                onClick={() => {
                  setActive(true);
                  setLogoAttr(false);
                  setLinkAttr(false);
                }}
                onFocus={() => {
                  setActive(false);
                }}
                onBlur={(e) => {
                  e.preventDefault();
                  if (linkAttr === true || logoAttr === true) {
                    setActive(true);
                  } else {
                    setActive(false);
                    setTimeout(() => {
                      setActive(true)
                    }, 1)
                  }

                }}
                className={setLinkActive}
                to="/signIn"
                tabIndex={linkAttr || logoAttr === true ? 0 : -1}
              >
                Войти
              </NavLink>
            </li>
            <li className={styled.dropdown_menu__item}>
              <NavLink
                onClick={() => {
                  setActive(true);
                  setLogoAttr(false);
                  setLinkAttr(!linkAttr);
                }}
                onFocus={() => {
                  setActive(false);
                }}
                onBlur={() => {
                  linkAttr === false && setActive(true);
                }}
                className={setLinkActive}
                to="/signUp"
                tabIndex={!linkAttr ? 0 : -1}
              >
                Зарегистрироваться
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
}

export default Menu;
