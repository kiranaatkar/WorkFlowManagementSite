import React, { useState, useEffect } from 'react';
import '../App.css';
import './Dashboard.css';
import Networking from './Networking.js';
import ProjectWiget from './ProjectWiget';

function Dashboard(props) {
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
    if (projects.length) {
      return projects.map((project) => (
        <ProjectWiget project={project} key={project.id} />
      ));
    } else {
      return <h3>No projects yet</h3>;
    }
  }

  return (
    <div className='dashboard-wrapper'>
      <div className='projects-wrapper'>
        {getProjectsComponentList(projects)}
      </div>
    </div>
  );
}

export default Dashboard;
