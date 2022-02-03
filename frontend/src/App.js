import "./App.css";
import NewProject from "./components/NewProject.js";
import SideNavBar from "./components/SideNavBar.js";

function App() {
  return (
    <div className="App-wrapper">
      <div className="top-nav-wrapper"></div>
      <div className="main-content-wrapper">
        <div className="side-nav">
          <SideNavBar />
        </div>
        <div className="display-wrapper">
          <NewProject />
        </div>
      </div>
    </div>
  );
}

export default App;
