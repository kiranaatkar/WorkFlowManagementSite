import "../App.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="top-nav-wrapper">
      <h1>
        <i class="fas fa-laptop-code"></i> Very Good™️ Project Management Site
      </h1>

      <div className="header-icons">
        <Link to="/dashboard">
          <button className="home-btn btn">⌂</button>
        </Link>

        <div className="dropdown">
          <button className="dropbtn btn">
            <i class="far fa-user"></i>
          </button>
          <div className="dropdown-content">
            <div>
              <Link to="/login">Login</Link>
              <Link to="/createAccount">Create Account</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
