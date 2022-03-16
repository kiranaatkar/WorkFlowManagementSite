import { Link } from 'react-router-dom';
import ProjectDropDown from './ProjectDropDown';

function SideBarMenu(props) {
  return (
    <div className='menu'>
      <ul className='menu-links'>
        <li className='nav-link'>
          <Link to='/dashboard'>
            <i className='bx bx-grid-alt icon'></i>
            <span className='text nav-text'>Dashboard</span>
          </Link>
        </li>

        <ProjectDropDown user={props.user} toggleNavBar={props.toggleNavBar} />

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
        <li>
          <a href='#'>
            <i className='bx bx-cog icon'></i>
            <span className='text nav-text'>Settings</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SideBarMenu;
