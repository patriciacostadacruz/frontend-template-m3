import axios from "axios";

class ProjectService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/projects`,
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getProjects() {
    return this.api.get("/").then(({ data }) => data);
  }

  createProject(body) {
    return this.api.post("/", body).then(({ data }) => data);
  }

  getProject(projectId) {
    return this.api.get(`/${projectId}`).then(({ data }) => data);
  }

  deleteProject(projectId) {
    return this.api.delete(`/${projectId}`).then(({ data }) => data);
  }

  editProject(projectId, body) {
    return this.api.put(`/${projectId}`, body).then(({ data }) => data);
  }
}

const projectService = new ProjectService();

export default projectService;
