import React, { useState, useEffect } from "react";
import "../App.css";
import Networking from "./Networking.js";

function SideNavBar(props) {
  const [projects, setProjects] = useState([]);
  const myAPI = new Networking();

  useEffect(() => {
    fetchData();
  }, []); // ComponentDidMount

  async function fetchData() {
    const json = await myAPI.getAllProjects();
    setProjects(json);
  }

  function getProjectsComponentList(projects) {
    if (projects.length) {
      return projects.map((project) => (
        <button key={project.project_id}> {project.title}</button>
      ));
    } else {
      return <h3>No projects yet</h3>;
    }
  }

  return (
    <div className="side-nav-wrapper">
      <div className="projects-nav-wrapper">
        {getProjectsComponentList(projects)}
      </div>
    </div>
  );
}

export default SideNavBar;
