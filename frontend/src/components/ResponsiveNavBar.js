import React, { useState } from 'react';
import './SideNav.css';

function ResponsiveNavBar(props) {
  const [navOpen, toggleNav] = useState(false);

  function toggleNavBar(origin) {
    if (origin === 'toggle') {
      toggleNav(!navOpen);
    } else if (origin === 'search-box' && !navOpen) {
      toggleNav(!navOpen);
    }
  }

  function toggleDarkMode(e) {
    props.toggleDarkMode();
  }

  return (
    <nav className={`sidebar ${navOpen ? '' : 'close'}`}>
      <header>
        <div className='image-text'>
          <span className='image'>
            <img src='logo.png' alt='' />
          </span>

          <div className='text logo-text'>
            <span className='name'>Very Good</span>
            <span className='profession'>Web developer</span>
          </div>
        </div>

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
              <a href='#'>
                <i className='bx bx-home-alt icon'></i>
                <span className='text nav-text'>Dashboard</span>
              </a>
            </li>

            <li className='nav-link'>
              <a href='#'>
                <i className='bx bx-bar-chart-alt-2 icon'></i>
                <span className='text nav-text'>Revenue</span>
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

            <li className='nav-link'>
              <a href='#'>
                <i className='bx bx-heart icon'></i>
                <span className='text nav-text'>Likes</span>
              </a>
            </li>

            <li className='nav-link'>
              <a href='#'>
                <i className='bx bx-wallet icon'></i>
                <span className='text nav-text'>Wallets</span>
              </a>
            </li>
          </ul>
        </div>

        <div className='bottom-content'>
          <li className=''>
            <a href='#'>
              <i className='bx bx-log-out icon'></i>
              <span className='text nav-text'>Logout</span>
            </a>
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
