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

  getProjects(search, industry) {
    return this.api
      .get("/", { params: { search, industry } })
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  createProject(body) {
    return this.api
      .post("/", body)
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  getProject(projectId) {
    return this.api
      .get(`/${projectId}`)
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  deleteProject(projectId) {
    return this.api
      .delete(`/${projectId}`)
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  editProject(projectId, body) {
    return this.api
      .put(`/${projectId}`, body)
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }
}

const projectService = new ProjectService();

export default projectService;
