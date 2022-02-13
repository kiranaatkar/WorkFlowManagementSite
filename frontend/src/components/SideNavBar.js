import React, { useState, useEffect } from "react";
import "../App.css";
import Networking from "./Networking.js";
import { Link } from "react-router-dom";
import getCookieObj from "./GetCookies";

function SideNavBar(props) {
  const [projects, setProjects] = useState([]);
  const myAPI = new Networking();
  const cookies = getCookieObj();

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
        <Link
          key={project.title}
          to={`/project/${project.title}`}
          state={{ project: project }}
        >
          <button className="btn sidebar-project-btn">{project.title}</button>
        </Link>
      ));
    } else {
      return <h3>No projects yet</h3>;
    }
  }

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav(e) {
    const openNavBtn =
      e.target.parentNode.nextElementSibling.firstChild.firstChild;
    const sideBar = e.target.parentNode;
    const main = e.target.parentNode.parentNode.firstChild.nextElementSibling;
    sideBar.style.width = "0px";
    main.style.marginLeft = "0px";
    openNavBtn.style.display = "inline-block";
  }

  return (
    <div className="sidebar">
      <button className="closebtn" onClick={(e) => closeNav(e)}>
        &#9776;
      </button>
      <h3 className="sidebar-title">Projects</h3>
      <div className="sidebar-projects-wrapper">
        <Link to={cookies.user ? "/createProject" : "/login"}>
          <button className="btn sidebar-project-btn">+ Create</button>
        </Link>
        {getProjectsComponentList(projects)}
      </div>
    </div>
  );
}

export default SideNavBar;
