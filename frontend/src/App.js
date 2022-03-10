import './App.css';
import './style.css';
import React, { useState } from 'react';
import NewProject from './components/NewProject.js';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Project from './components/Project';
import LoginPage from './components/LoginPage';
import CreateAccount from './components/CreateAccount';
import ResponsiveNavBar from './components/ResponsiveNavBar';
import { Routes, Route } from 'react-router-dom';
import getCookieObj from './components/GetCookies';

function App() {
  const [darkMode, toggleMode] = useState(false);
  const [user, userLoggedIn] = useState(getCookieObj().user);

  function toggleDarkMode() {
    toggleMode(!darkMode);
  }

  function logInOut() {
    console.log(getCookieObj().user);
    userLoggedIn(getCookieObj().user);
  }

  return (
    <div className={`app-wrapper ${darkMode ? 'dark' : ''}`}>
      <ResponsiveNavBar
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        user={user}
        logInOut={logInOut}
      />

      <section className='home'>
        <Header />
        <main>
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/login' element={<LoginPage logInOut={logInOut} />} />
            <Route path='/createAccount' element={<CreateAccount />} />
            <Route path='/project/:name' element={<Project />} />
            <Route path='/createProject' element={<NewProject />} />
          </Routes>
        </main>
      </section>
    </div>
  );
}

export default App;
