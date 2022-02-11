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
    setProjects(json.projects);
  }

  function getProjectsComponentList(projects) {
    if (projects.length) {
      return projects.map((project) => (
        <button
          key={project.project_id}
          className="btn sidebar-project-btn"
          onClick={() =>
            props.viewProject({ component: "project", props: project })
          }
        >
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
        <button
          className="btn sidebar-project-btn"
          onClick={() =>
            props.viewProject({ component: "new-project", props: null })
          }
        >
          + Create
        </button>
        {getProjectsComponentList(projects)}
      </div>
    </div>
  );
}

export default SideNavBar;
