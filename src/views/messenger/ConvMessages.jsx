import Loading from "../../components/Loading";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import messengerServices from "../../services/messengerServices";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

function ConvMessages() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const { conversationId } = useParams();
  const { user } = useContext(AuthContext);

  const getMessages = async () => {
    setLoading(true);
    try {
      const response = await messengerServices.getConvMessages(conversationId);
      if (response.error) {
        toast.error(response.error);
      } else {
        console.log(response.messages);
        setMessages(response.messages);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to fetch messages.");
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
      {!loading && messages.length > 0 ? (
        <div>
          <h2>Conversation</h2>
          <ul>
            {messages.map((message) => (
              <li
                key={message._id}
                className={message.sender._id === user._id ? "sent-by-user" : "sent-by-other-person"}
              >
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
