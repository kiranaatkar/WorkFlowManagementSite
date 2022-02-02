import "./App.css";
import NewProject from "./components/NewProject.js";

function App() {
  return (
    <div className="App-wrapper">
      <div className="top-nav-wrapper"> top-nav</div>
      <div className="main-content-wrapper">
        <div className="side-nav-wrapper">side-nav</div>
        <div className="display-wrapper">
          <NewProject />
        </div>
      </div>
    </div>
  );
}

export default App;
