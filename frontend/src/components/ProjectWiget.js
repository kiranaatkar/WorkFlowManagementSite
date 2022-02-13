import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function ProjectWiget(props) {
  const { title, due_date, description } = props.project;
  const due = new Date(due_date).toLocaleString().split(", ")[0];

  return (
    <div className="project-display" key={title}>
      <Link to={`/project/${title}`} state={{ project: props.project }}>
        <h1 className="emphasis">{title}</h1>{" "}
      </Link>
      <h6 className="emphasis"> Due: {due}</h6>
      <h5>{description}</h5>
    </div>
  );
}

export default ProjectWiget;
