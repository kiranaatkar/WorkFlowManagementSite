import "../App.css";
import React, { useEffect, useState } from "react";

const TODAY = new Date();

function NewProject() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [description, setDescription] = useState("");
  const [tasks, updateTasks] = useState([]);

  useEffect(() => {
    console.log(title, dueDate, description);
  });

  function displayTasks(tasks) {
    return tasks.map((task, i) => {
      return <textarea key={i}></textarea>;
    });
  }

  return (
    <div>
      <h2>New Project</h2>
      <form className="form-wrapper">
        <label htmlFor="project-title">Project Title</label>
        <input
          type="text"
          id="project-title"
          className="form-item"
          onChange={(e) => setTitle(e.target.value)}
        ></input>

        <label htmlFor="project-due-date">Due date:</label>
        <input
          type="date"
          id="project-due-date"
          name="project-due-date"
          min={TODAY.toISOString().split("T")[0]}
          className="form-item"
          onChange={(e) => setDueDate(e.target.value)}
        ></input>

        <label htmlFor="project-description">Project Description</label>
        <textarea
          type="text"
          id="project-description"
          className="form-item"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {displayTasks(tasks)}

        <button onClick={() => updateTasks([...tasks, []])}> Add Task </button>
      </form>
    </div>
  );
}

export default NewProject;
