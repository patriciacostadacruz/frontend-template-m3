import Loading from "../../components/Loading";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import messengerServices from "../../services/messengerServices";

function ConvMessages(props) {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const { conversationId } = useParams();

  const getMessages = async () => {
    setLoading(true);
    try {
      const response = await messengerServices.getConvMessages(conversationId);
      console.log(response.messages);
      setMessages(response.messages);
      setLoading(false);
    } catch (error) {
      setErrorMessage("Failed to fetch messages");
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <Loading />}
      {errorMessage && <p>{errorMessage}</p>}
      {!loading && messages.length > 0 ? (
        <div>
          <h2>Conversation</h2>
          <ul>
            {messages.map((message) => (
              <li key={message._id}>
                <p>
                  <strong>{message.sender.firstName}</strong>
                </p>
                <p>{message.content}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        "No messages to show."
      )}
    </>
  );
}

export default ConvMessages;
