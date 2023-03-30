import axios from "axios";

class ProfileService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/profile`,
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getProfile() {
    return this.api.get("/").then(({ data }) => data);
  }

  editPassword(body) {
    return this.api.put("/password-edit", body).then(({ data }) => data);
  }

  editStatus(body) {
    return this.api.put("/status-update", body).then(({ data }) => data);
  }

  getOtherUser(userId) {
    return this.api.get(`/${userId}`).then(({ data }) => data);
  }

  editProfile(body) {
    return this.api.put("/edit", body).then(({ data }) => data);
  }
}

const profileService = new ProfileService();

export default profileService;
