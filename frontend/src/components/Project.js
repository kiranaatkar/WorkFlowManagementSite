import "../App.css";
import Networking from "./Networking";
import React, { useEffect, useState, useRef } from "react";

function Project(props) {
  const [tasks, setTasks] = useState([]);

  const myAPI = new Networking();
  const { project_id, title, created_at, due_date, description } =
    props.project;

  const created = new Date(created_at).toLocaleString().split(", ")[0];
  const due = new Date(due_date).toLocaleString();

  const mounted = useRef();
  useEffect(() => {
    fetchTasks(project_id);
    mounted.current = true;
  }, [project_id]); // ComponentDidMount

  async function fetchTasks(id) {
    const json = await myAPI.getProjectTasks(id);
    console.log(id);
    setTasks(json.tasks);
  }

  function getTaskComponentList(tasks) {
    if (tasks.length) {
      return tasks.map((task) => {
        return <div key={task.task_id}>{task.description}</div>;
      });
    } else {
      return;
    }
  }

  return (
    <div>
      <h1>Title: {title}</h1>
      <h6>Created {created}</h6>
      <h3>Due: {due}</h3>
      <h2>Overview: {description}</h2>
      <div>{getTaskComponentList(tasks)}</div>
    </div>
  );
}

export default Project;
