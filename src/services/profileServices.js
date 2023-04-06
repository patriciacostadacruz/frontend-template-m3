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
    return this.api
      .get("/")
      .then(({ data }) => data)
      .catch(({ message }) => message);
  }

  editPassword(body) {
    return this.api
      .put("/password-edit", body)
      .then(({ data }) => data)
      .catch(({ message }) => message);
  }

  editStatus(body) {
    return this.api
      .put("/status-update", body)
      .then(({ data }) => data)
      .catch(({ message }) => message);
  }

  editPicture(body) {
    return this.api
      .put("/edit-picture", body)
      .then(({ data }) => data)
      .catch(({ message }) => message);
  }

  getOtherUser(userId) {
    return this.api
      .get(`/${userId}`)
      .then(({ data }) => data)
      .catch(({ message }) => {
        return message;
      });
  }

  editProfile(body) {
    return this.api
      .put("/", body)
      .then(({ data }) => data)
      .catch(({ message }) => message);
  }
}

const profileService = new ProfileService();

export default profileService;
