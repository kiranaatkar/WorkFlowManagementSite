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
  return (
    <div className="App-wrapper">
      <Header />
      <div className="main-content-wrapper">
        <SideNavBar />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="/project" element={<Project />} />
            <Route path="/createProject" element={<NewProject />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
