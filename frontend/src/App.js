import "./App.css";
import React, { useState } from "react";
import NewProject from "./components/NewProject.js";
import SideNavBar from "./components/SideNavBar.js";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Project from "./components/Project";
import LoginPage from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import { Routes, Route } from "react-router-dom";

function App() {
  /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
  function openNav(e) {
    const openNavBtn = e.target;
    const sideBar = e.target.parentNode.parentNode.parentNode.firstChild;
    const main = e.target.parentNode.parentNode;
    sideBar.style.width = "250px";
    sideBar.style.display = "block";
    main.style.marginLeft = "250px";
    openNavBtn.style.display = "none";
  }

  return (
    <div className="app-wrapper">
      <SideNavBar id="mySidebar" />

      <div className="main-content-wrapper">
        <div id="main-side-bar">
          <button className="openbtn" onClick={(e) => openNav(e)}>
            &#9776;
          </button>
        </div>
        <div>
          <Header />
          <main>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/createAccount" element={<CreateAccount />} />
              <Route path="/project/:name" element={<Project />} />
              <Route path="/createProject" element={<NewProject />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
