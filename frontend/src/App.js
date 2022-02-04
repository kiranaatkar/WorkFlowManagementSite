import "./App.css";
import React, { useState, useEffect } from "react";
import NewProject from "./components/NewProject.js";
import SideNavBar from "./components/SideNavBar.js";
import Dashboard from "./components/Dashboard";
import Project from "./components/Project";

function App() {
  const [display, setDisplay] = useState({
    component: "new-project",
    props: null,
  });

  function displayComponent(display) {
    switch (display.component) {
      case "new-project":
        return <NewProject />;

      case "project":
        return (
          <Project
            project={display.props}
            viewProject={(displayObj) => setDisplay(displayObj)}
          />
        );

      default:
        return <Dashboard />;
    }
  }

  return (
    <div className="App-wrapper">
      <div className="top-nav-wrapper"></div>
      <div className="main-content-wrapper">
        <div className="side-nav">
          <SideNavBar viewProject={(displayObj) => setDisplay(displayObj)} />
        </div>
        <div className="display-wrapper">{displayComponent(display)}</div>
      </div>
    </div>
  );
}

export default App;
