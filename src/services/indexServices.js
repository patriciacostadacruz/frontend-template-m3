import axios from "axios";

class IndexService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/`,
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getRandomProjects() {
    return this.api.get("/").then(({ data }) => data);
  }

  getUsers() {
    return this.api.get("/users").then(({ data }) => data);
  }
}

const indexService = new IndexService();

export default indexService;
