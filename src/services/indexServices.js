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
    return this.api
      .get("/")
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  getUsers(search, industry) {
    return this.api
      .get("/users", { params: { search, industry } })
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }
}

const indexService = new IndexService();

export default indexService;
