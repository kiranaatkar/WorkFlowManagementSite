import "../App.css";
import { Link } from "react-router-dom";
import getCookieObj from "./GetCookies";
import { useState } from "react";
import Networking from "./Networking";

function Header() {
  const [cookies, setCookies] = useState(getCookieObj());
  const myAPI = new Networking();

  async function logOut() {
    await myAPI.logOut();
    const newCookies = getCookieObj();
    // refresh header
    setCookies(newCookies);
  }
  return (
    <header className="top-nav-wrapper">
      <h1>
        <i className="fas fa-laptop-code"></i> Very Good™️ Project Management
        Site
      </h1>

      <div className="header-icons">
        <Link to="/dashboard">
          <button className="home-btn btn">⌂</button>
        </Link>

        <div className="dropdown">
          <button className="dropbtn btn">
            <i className="far fa-user"></i>
          </button>
          <div className="dropdown-content">
            {cookies.user ? (
              <div>
                <Link className="username" to="/profile">
                  {cookies.user.split("@")[0]}
                </Link>
                <Link to="/login" onClick={async () => await logOut()}>
                  Log out
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/login">Login</Link>
                <Link to="/createAccount">Create Account</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
