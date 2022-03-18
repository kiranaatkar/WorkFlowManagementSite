class Networking {
  async getProjectsMetaData() {
    const response = await fetch('http://localhost:8080/projects');
    const json = await response.json();
    return json;
  }

  async getProjectTasks(project_id) {
    const response = await fetch(
      `http://localhost:8080/projects/tasks/${project_id}`
    );
    const json = await response.json();
    return json;
  }

  async postNewProject(data) {
    const response = await fetch('http://localhost:8080/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  }

  async createAccount(email, password, confirmation) {
    const data = { email, password, confirmation };
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return { json, status: response.status };
  }

  async login(email, password) {
    const data = { email, password };
    const response = await fetch('http://localhost:8080/sessions', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log(json);
    return { json, status: response.status };
  }

  async logOut() {
    const response = await fetch(`http://localhost:8080/sessions`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  }
}

export default Networking;
