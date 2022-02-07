class Networking {
  async getAllProjects() {
    const response = await fetch("http://localhost:8080/projects");
    const json = await response.json();
    return json;
  }

  async getProjectTasks(project_id) {
    const response = await fetch(
      `http://localhost:8080/projects/${project_id}/tasks`
    );
    const json = await response.json();
    return json;
  }

  async postNewProject(data) {
    const response = await fetch("http://localhost:8080/projects/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  }
}

export default Networking;
