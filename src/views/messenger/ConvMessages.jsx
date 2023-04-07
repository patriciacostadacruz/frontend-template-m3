import Loading from "../../components/Loading";
import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import messengerServices from "../../services/messengerServices";
import { AuthContext } from "../../context/AuthContext";
import Message from "../../components/messenger/Message";
import toast from "react-hot-toast";

function ConvMessages() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { conversationId } = useParams();
  const { user } = useContext(AuthContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      inputRef.current &&
      // allows to send with enter button only if user has input elected
      inputRef.current === document.activeElement
    ) {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage) {
      toast.error("Please write your message content.");
    }
    try {
      const response = await messengerServices.sendMessage(conversationId, {
        recipient:
          messages[0].sender._id === user._id
            ? messages[0].recipient._id
            : messages[0].sender._id,
        content: newMessage,
      });
      if (response.error) {
        toast.error(response.error);
      } else {
        setMessages([...messages, response.message]);
        setNewMessage("");
      }
    } catch (error) {
      toast.error("Failed to send message.");
    }
  };

  const handleUpdateMessage = async (messageId, updatedContent) => {
    try {
      const response = await messengerServices.updateMessage(
        messageId,
        updatedContent
      );
      if (response.error) {
        toast.error(response.error);
      } else {
        const updatedMessages = messages.map((message) =>
          message._id === messageId ? response.message : message
        );
        setMessages(updatedMessages);
      }
    } catch (error) {
      toast.error("Failed to update message.");
    }
  };


  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await messengerServices.deleteMessage(messageId);
      if (response.error) {
        toast.error(response.error);
      } else {
        const updatedMessages = messages.filter(
          (message) => message._id !== messageId
        );
        setMessages(updatedMessages);
        toast.success("Message deleted successfully!");
      }
    } catch (error) {
      toast.error("Failed to delete message.");
    }
  };


  useEffect(() => {
    getMessages();
    scrollToBottom();
    console.log(messages);
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
              <Message
                key={message._id}
                message={message}
                user={user}
                onDelete={handleDeleteMessage}
                onUpdate={handleUpdateMessage}
              />
            ))}
          </ul>
          <div>
            <input
              type="text"
              placeholder="Type your message here."
              value={newMessage}
              onChange={handleNewMessageChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      ) : (
        "No messages to show."
      )}
      <div ref={messagesEndRef} />
    </>
  );
}

export default ConvMessages;
