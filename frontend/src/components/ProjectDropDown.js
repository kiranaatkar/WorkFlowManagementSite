import './Dropdown.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Networking from './Networking';

function ProjectDropDown(props) {
  const [projects, setProjects] = useState([]);
  const myAPI = new Networking();

  useEffect(() => {
    fetchData();
  }, []); // ComponentDidMount

  async function fetchData() {
    const json = await myAPI.getAllProjects();
    setProjects(json.projects);
  }

  function getProjectsComponentList(projects) {
    if (projects.length && props.user) {
      return projects.map((project) => (
        <li className='nav-link'>
          <Link
            key={project.title}
            to={`/project/${project.title}`}
            state={{ project: project }}>
            <span className='text nav-text'>{project.title}</span>
          </Link>
        </li>
      ));
    } else {
      return <li>No projects yet</li>;
    }
  }

  return (
    <div className='dropdown'>
      <li className='nav-link dropdown-btn'>
        <a href='#'>
          <i className='bx bx-book-content icon'></i>
          <span className='text nav-text'>Projects</span>
        </a>
      </li>
      <div className='dropdown-content'>
        <li clasName='nav-link'>
          <Link to={props.user ? '/createProject' : '/login'}>
            <span className='text nav-text'>+ Create</span>
          </Link>
        </li>
        {getProjectsComponentList(projects)}
      </div>
    </div>
  );
}

export default ProjectDropDown;

// <div className='dropdown'>
//   <button className='dropbtn btn'>
//     <i className='far fa-user'></i>
//   </button>
//   <div className='dropdown-content'>
//     {cookies.user ? (
//       <div>
//         <Link className='username' to='/profile'>
//           {cookies.user.split('@')[0]}
//         </Link>
//         <Link to='/login' onClick={async () => await logOut()}>
//           Log out
//         </Link>
//       </div>
//     ) : (
//       <div>
//         <Link to='/login'>Login</Link>
//         <Link to='/createAccount'>Create Account</Link>
//       </div>
//     )}
//   </div>
// </div>;
