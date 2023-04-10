import axios from "axios";

class MessengerService {
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

  getConversations() {
    return this.api
      .get("/conversations")
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  createConversation(recipientId) {
    return this.api
      .post(`/conversations/${recipientId}`)
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  getConvMessages(conversationId) {
    return this.api
      .get(`/messages/${conversationId}`)
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  sendMessage(conversationId, body) {
    return this.api
      .post(`/messages/${conversationId}`, body)
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  editMessage(messageId, body) {
    return this.api
      .put(`/messages/${messageId}`, body)
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  deleteMessage(messageId) {
    return this.api
      .delete(`/messages/${messageId}`)
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }
}

const messengerService = new MessengerService();

export default messengerService;
