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
    return this.api
      .get("/")
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  createConversation(body) {
    return this.api
      .post("/", body)
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  getConversation(conversationId) {
    return this.api
      .get(`/${conversationId}`)
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  sendMessage(conversationId, body) {
    return this.api
      .post(`/${conversationId}`, body)
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  editMessage(messageId, body) {
    return this.api
      .put(`/${messageId}`, body)
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  deleteMessage(messageId) {
    return this.api
      .delete(`/${messageId}`)
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  deleteConversation(conversationId) {
    return this.api
      .delete(`/${conversationId}`)
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }
}

const messengerService = new MessengerService();

export default messengerService;
