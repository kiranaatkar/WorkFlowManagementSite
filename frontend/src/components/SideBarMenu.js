import { Link } from 'react-router-dom';
import ProjectDropDown from './ProjectDropDown';

function SideBarMenu(props) {
  return (
    <div className='menu'>
      <li
        className='search-box'
        onClick={() => props.toggleNavBar('search-box')}>
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

        <ProjectDropDown user={props.user} />

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
  );
}

export default SideBarMenu;
