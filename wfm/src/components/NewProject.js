import "../App.css";
import React, { useEffect, useState } from "react";

const TODAY = new Date();

function NewProject() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [description, setDescription] = useState("");
  const [tasks, updateTasks] = useState([]);

  function displayTasks(tasks) {
    return tasks.map((task, i) => {
      return (
        <div key={i} id={task.id}>
          <textarea
            onChange={(e) => updateTask(e)}
            placeholder={`Task ${i + 1}`}
            value={task.info}
          ></textarea>
          <button id={task.id} onClick={(e) => removeTask(e)}>
            x
          </button>
        </div>
      );
    });
  }

  function addTask(e) {
    e.preventDefault();
    const randStr = (Math.random() + 1).toString(36).substring(7);
    updateTasks([...tasks, { id: randStr, info: "" }]);
  }

  function updateTask(e) {
    const newTasks = [...tasks];
    const targetIndex = newTasks.findIndex(
      (task) => task.id === e.target.parentNode.id
    );
    newTasks[targetIndex].info = e.target.value;
    updateTasks(newTasks);
  }

  function removeTask(e) {
    e.preventDefault();
    updateTasks(tasks.filter((task) => task.id !== e.target.id));
  }

  function clearFields(e) {
    e.preventDefault();
    setTitle("");
    setDueDate(null);
    setDescription("");
    updateTasks([]);
  }

  function onSubmit() {}

  return (
    <div>
      <h2>New Project</h2>
      <form className="form-wrapper">
        <input
          type="text"
          id="project-title"
          placeholder="Project Title"
          className="form-item"
          onChange={(e) => setTitle(e.target.value)}
        ></input>

        <label htmlFor="project-due-date">Due:</label>
        <input
          type="text"
          onFocus={(e) => (e.target.type = "date")}
          id="project-due-date"
          name="project-due-date"
          placeholder="Due Date"
          min={TODAY.toISOString().split("T")[0]}
          className="form-item"
          onChange={(e) => setDueDate(e.target.value)}
        ></input>

        <textarea
          type="text"
          placeholder="Project Overview"
          id="project-description"
          className="form-item"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {displayTasks(tasks)}

        <button onClick={(e) => addTask(e)}> Add Task </button>
        <button onClick={() => onSubmit}>Submit</button>
        <button onClick={(e) => clearFields(e)}>Clear Fields</button>
      </form>
    </div>
  );
}

export default NewProject;
