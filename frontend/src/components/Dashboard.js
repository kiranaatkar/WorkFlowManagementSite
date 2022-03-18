import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import './Dashboard.css';
import Networking from './Networking.js';
import ProjectWiget from './ProjectWiget';

function Dashboard(props) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const myAPI = new Networking();

  //fetch meta data
  const mounted = useRef(true);
  useEffect(() => {
    if (mounted.current) {
      setLoading(true);
      (async () => {
        const json = await myAPI.getProjectsMetaData();
        setProjects(json.projects);
        setLoading(false);
      })();
    }
    return () => {
      mounted.current = false;
    };
  }, []); // Only fetches data when mounted

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
