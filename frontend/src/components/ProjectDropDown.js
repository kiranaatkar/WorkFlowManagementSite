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
        <li className='nav-link' key={project.title}>
          <Link to={`/project/${project.title}`} state={{ project: project }}>
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
      <li
        className='nav-link dropdown-btn'
        onClick={() => props.toggleNavBar('project-btn')}>
        <a href='#'>
          <i className='bx bx-book-content icon'></i>
          <span className='text nav-text'>Projects</span>
        </a>
      </li>
      <div className='dropdown-content'>
        <li className='nav-link' key='Create-project'>
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
