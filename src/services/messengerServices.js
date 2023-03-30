import axios from "axios";

class MessengerService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/conversations`,
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getConversations() {
    return this.api.get("/").then(({ data }) => data);
  }

  createConversation(body) {
    return this.api.post("/", body).then(({ data }) => data);
  }

  getConversation(conversationId) {
    return this.api.get(`/${conversationId}`).then(({ data }) => data);
  }

  sendMessage(conversationId, body) {
    return this.api.post(`/${conversationId}`, body).then(({ data }) => data);
  }

}

const messengerService = new MessengerService();

export default messengerService;
