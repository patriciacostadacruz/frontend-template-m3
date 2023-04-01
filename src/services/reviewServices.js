import axios from "axios";

class ReviewService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/reviews`,
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  addReview(body) {
    return this.api
      .post("/new", body)
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }
}

const reviewService = new ReviewService();

export default reviewService;
