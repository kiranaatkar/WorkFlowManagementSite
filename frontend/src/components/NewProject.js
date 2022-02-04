import "../App.css";
import Networking from "./Networking";
import React, { useEffect, useState } from "react";

const TODAY = new Date();

function NewProject() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, updateTasks] = useState([]);
  const myAPI = new Networking();

  function displayTasks(tasks) {
    return tasks.map((task, i) => {
      return (
        <div key={i} id={task.id} className="task">
          <label className="form-field task">
            <textarea
              onChange={(e) => updateTask(e)}
              value={task.info}
              onBlur={(e) => handleBlur(e)}
            ></textarea>
            <span className="placeholder">{`Task ${i + 1}`}</span>
            <button
              id={task.id}
              onClick={(e) => removeTask(e)}
              className="form-btn"
            >
              x
            </button>
          </label>
        </div>
      );
    });
  }

  function addTask(e) {
    e.preventDefault();
    const randStr = (Math.random() + 1).toString(36).substring(7);
    updateTasks([...tasks, { id: randStr, info: "" }]);
  }

  function removeTask(e) {
    e.preventDefault();
    updateTasks(tasks.filter((task) => task.id !== e.target.id));
  }

  function clearFields(e) {
    e.preventDefault();
    setTitle("");
    setDueDate("");
    setDescription("");
    updateTasks([]);
  }

  function updateTask(e) {
    const targetIndex = tasks.findIndex(
      (task) => task.id === e.target.parentNode.parentNode.id
    );
    tasks[targetIndex].info = e.target.value;
    updateTasks([...tasks]);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (title && dueDate && description) {
      const data = { title, dueDate, description, tasks };
      const response = await myAPI.postNewProject(data);
      clearFields(e);
    }
  }

  function handleBlur(e) {
    if (e.target.value) e.target.classList.add("blurred");
    else e.target.classList.remove("blurred");
  }

  return (
    <div>
      <h2 className="new-project-title">New Project</h2>
      <form className="form-wrapper">
        <label className="form-field">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={(e) => handleBlur(e)}
          ></input>
          <span className="placeholder">Project Title</span>
        </label>

        <label className="form-field">
          <input
            type="text"
            value={dueDate}
            onFocus={(e) => (e.target.type = "date")}
            min={TODAY.toISOString().split("T")[0]}
            onChange={(e) => setDueDate(e.target.value)}
            onBlur={(e) => handleBlur(e)}
          ></input>
          <span className="placeholder">Due Date</span>
        </label>
        <label className="form-field">
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={(e) => handleBlur(e)}
          ></textarea>
          <span className="placeholder">Project Overview</span>
        </label>

        {displayTasks(tasks)}

        <div className="form-btns">
          <button onClick={(e) => addTask(e)} className="form-btn add">
            Add Task
          </button>
          <div>
            <button onClick={(e) => clearFields(e)} className="form-btn clear">
              Clear All
            </button>
            <button onClick={(e) => onSubmit(e)} className="form-btn submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewProject;
