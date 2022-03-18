import React, { useState } from 'react';
import './SideNav.css';
import './ToggleSwitch.css';
import { Link } from 'react-router-dom';
import Networking from './Networking';
import SideBarHeader from './SideBarHeader.js';
import SideBarMenu from './SideBarMenu';

function ResponsiveNavBar(props) {
  const [navOpen, toggleNav] = useState(false);
  const myAPI = new Networking();

  function toggleNavBar(origin) {
    if (origin === 'toggle') {
      toggleNav(!navOpen);
    } else if (
      (origin === 'search-box' || origin === 'project-btn') &&
      !navOpen
    ) {
      toggleNav(!navOpen);
    }
  }

  function toggleDarkMode() {
    props.toggleDarkMode();
  }

  async function handleLogInOut() {
    if (props.user) {
      await myAPI.logOut();
    }
    props.logInOut();
  }

  return (
    <nav className={`sidebar ${navOpen ? '' : 'close'}`}>
      <SideBarHeader user={props.user} toggleNavBar={toggleNavBar} />

      <div className='menu-bar'>
        <SideBarMenu toggleNavBar={toggleNavBar} user={props.user} />
        <div className='bottom-content'>
          <li className=''>
            <Link to='/login' onClick={async () => await handleLogInOut()}>
              <i className={`bx bx-log-${props.user ? 'out' : 'in'} icon`}></i>
              <span className='text nav-text'>{`${
                props.user ? 'Logout' : 'Login'
              }`}</span>
            </Link>
          </li>

          <li className='mode sun-moon search-box'>
            <i
              className={`bx bx-${
                !props.darkMode ? 'moon icon moon' : 'sun icon sun'
              }`}
              onClick={(e) => toggleDarkMode(e)}></i>
            <span className='mode-text text dark-mode'>
              {props.darkMode ? 'Light mode' : 'Dark mode'}
            </span>
            <label className='switch'>
              <input
                type='checkbox'
                checked={props.darkMode ? true : false}
                onChange={(e) => toggleDarkMode(e)}
              />
              <span className='slider round'></span>
            </label>
          </li>
        </div>
      </div>
    </nav>
  );
}

export default ResponsiveNavBar;
