import "../App.css";
import Networking from "./Networking";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

function Project(props) {
  const location = useLocation();
  const { project } = location.state;
  const { id, title, due_date, description } = project;
  const due = new Date(due_date).toLocaleString().split(", ")[0];

  const [tasks, setTasks] = useState([]);
  const myAPI = new Networking();

  const mounted = useRef();
  useEffect(() => {
    fetchTasks(id);
    mounted.current = true;
  }, [id]); // ComponentDidMount

  async function fetchTasks(id) {
    const json = await myAPI.getProjectTasks(id);
    setTasks(json.tasks);
  }

  function getTaskComponentList(tasks) {
    if (tasks.length) {
      return tasks.map((task) => {
        return <p key={task.id}>- {task.description}</p>;
      });
    } else {
      return;
    }
  }

  return (
    <div className="project-display">
      <h1 className="emphasis">{title}</h1>
      <h6 className="emphasis"> Due: {due}</h6>
      <h5>{description}</h5>

      <div>{getTaskComponentList(tasks)}</div>
    </div>
  );
}

export default Project;
