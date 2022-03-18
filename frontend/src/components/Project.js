import '../App.css';
import Networking from './Networking';
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function Project(props) {
  const location = useLocation();
  const { id, title, due_date, description } = location.state.project;
  const due = new Date(due_date).toLocaleString().split(', ')[0];

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const myAPI = new Networking();

  const mounted = useRef(true);

  //fetch tasks
  useEffect(() => {
    if (mounted.current) {
      setLoading(true);
      (async () => {
        const json = await myAPI.getProjectTasks(id);
        setTasks(json.tasks);
        setLoading(false);
      })();
    }
    return () => {
      mounted.current = false;
    };
  }, []); // Only fetches data when mounted

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
    <div className='project-display'>
      <h1 className='emphasis'>{title}</h1>
      <h6 className='emphasis'> Due: {due}</h6>
      <h5>{description}</h5>

      <div>{getTaskComponentList(tasks)}</div>
    </div>
  );
}

export default Project;
