import React, { useState } from 'react';
import './SideNav.css';
import { Link } from 'react-router-dom';
import Networking from './Networking';
import SideBarHeader from './SideBarHeader.js';

function ResponsiveNavBar(props) {
  const [navOpen, toggleNav] = useState(false);
  const myAPI = new Networking();

  function toggleNavBar(origin) {
    if (origin === 'toggle') {
      toggleNav(!navOpen);
    } else if (origin === 'search-box' && !navOpen) {
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
      <header>
        <SideBarHeader user={props.user} />
        <i
          className='bx bx-chevron-right toggle'
          onClick={() => toggleNavBar('toggle')}></i>
      </header>

      <div className='menu-bar'>
        <div className='menu'>
          <li className='search-box' onClick={() => toggleNavBar('search-box')}>
            <i className='bx bx-search icon'></i>
            <input type='text' placeholder='Search...' />
          </li>

          <ul className='menu-links'>
            <li className='nav-link'>
              <Link to='/dashboard'>
                <i className='bx bx-home-alt icon'></i>
                <span className='text nav-text'>Dashboard</span>
              </Link>
            </li>

            <li className='nav-link'>
              <a href='#'>
                <i className='bx bx-book-content icon'></i>
                <span className='text nav-text'>Projects</span>
              </a>
            </li>

            <li className='nav-link'>
              <a href='#'>
                <i className='bx bx-bell icon'></i>
                <span className='text nav-text'>Notifications</span>
              </a>
            </li>

            <li className='nav-link'>
              <a href='#'>
                <i className='bx bx-pie-chart-alt icon'></i>
                <span className='text nav-text'>Analytics</span>
              </a>
            </li>
          </ul>
        </div>

        <div className='bottom-content'>
          <li className=''>
            <Link to='/login' onClick={async () => await handleLogInOut()}>
              <i className={`bx bx-log-${props.user ? 'out' : 'in'} icon`}></i>
              <span className='text nav-text'>{`${
                props.user ? 'Logout' : 'Login'
              }`}</span>
            </Link>
          </li>

          <li className='mode'>
            <div className='sun-moon'>
              <i className='bx bx-moon icon moon'></i>
              <i className='bx bx-sun icon sun'></i>
            </div>
            <span className='mode-text text'>
              {props.darkMode ? 'Dark mode' : 'Light mode'}
            </span>

            <div className='toggle-switch' onClick={(e) => toggleDarkMode(e)}>
              <span className='switch'></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
}

export default ResponsiveNavBar;
