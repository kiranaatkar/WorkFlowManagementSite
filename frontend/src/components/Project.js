import "../App.css";
import Networking from "./Networking";
import React, { useEffect, useState } from "react";

function Project(props) {
  const myAPI = new Networking();
  const { title, created_at, due_date, description } = props.project;
  const created = new Date(created_at).toLocaleString().split(", ")[0];
  const due = new Date(due_date).toLocaleString();

  return (
    <div>
      <h1>Title: {title}</h1>
      <h6>Created {created}</h6>
      <h3>Due: {due}</h3>
      <h2>Overview: {description}</h2>
    </div>
  );
}

export default Project;
