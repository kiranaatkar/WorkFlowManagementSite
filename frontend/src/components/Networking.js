class Networking {
  async getAllProjects() {
    const response = await fetch("http://localhost:8080/projects");
    const json = await response.json();
    return json;
  }
}

export default Networking;
