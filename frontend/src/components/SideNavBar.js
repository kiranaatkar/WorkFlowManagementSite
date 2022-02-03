import React, { useState, useEffect } from "react";
import "../App.css";
import Networking from "./Networking.js";

function SideNavBar(props) {
  const [projects, setProjects] = useState([]);
  const myAPI = new Networking();

  useEffect(() => {
    fetchData();
  }); // ComponentDidMount

  async function fetchData() {
    const json = await myAPI.getAllProjects();
    setProjects(json);
  }

  function getProjectsComponentList(projects) {
    if (projects.length) {
      return projects.map((project) => (
        <button key={project.project_id} className="sidebar-project-btn">
          {project.title}
        </button>
      ));
    } else {
      return <h3>No projects yet</h3>;
    }
  }

  return (
    <div className="side-nav-wrapper">
      <h3 className="sidebar-title">Projects</h3>
      <div className="sidebar-projects-wrapper">
        {getProjectsComponentList(projects)}
        <button className="sidebar-project-btn">+ New Project</button>
      </div>
    </div>
  );
}

export default SideNavBar;
