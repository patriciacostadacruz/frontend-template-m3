import { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Message from "./Message";
import messengerServices from "../../services/messengerServices";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ConvMessages = () => {
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isFirstRender, setIsFirstRender] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { conversationId } = useParams();
  const { user } = useContext(AuthContext);

  const getMessages = async () => {
    try {
      const response = await messengerServices.getConvMessages(conversationId);
      if (response.error) {
        toast.error(response.error);
      } else {
        setMessages(response.messages);
      }
    } catch (error) {
      toast.error("Failed to fetch messages.");
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
      return;
    }
    try {
      const conversations = await messengerServices.getConversations();
      const thisConversation = conversations.filter((conversation) => {
        return conversation._id === conversationId;
      });
      let recipientId = thisConversation[0].users.find((elem) => {
        return elem._id !== user._id;
      })._id;
      const response = await messengerServices.sendMessage(conversationId, {
        recipientId,
        content: newMessage,
      });
      if (response.error) {
        toast.error(response.error);
      } else {
        setIsFirstRender(true);
        setNewMessage("");
        getMessages();
      }
    } catch (error) {
      toast.error("Failed to send message.");
    }
  };

  const handleUpdateMessage = async (messageId, updatedContent) => {
    try {
      const response = await messengerServices.editMessage(
        messageId,
        updatedContent
      );
      if (response.error) {
        toast.error(response.error);
      } else {
        getMessages();
        setIsFirstRender(false);
      }
    } catch (error) {
      toast.error("Failed to update message.");
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await messengerServices.deleteMessage(messageId);
      if (response.error) {
        toast.error("We could not delete this message.");
      } else {
        getMessages();
        toast.success("Message deleted successfully!");
        setIsFirstRender(false);
      }
    } catch (error) {
      toast.error("Failed to delete message.");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getMessages();
      setIsFirstRender(false);
    }, 2000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    if (messages && messages.length > 6 && isFirstRender) {
      scrollToBottom();
    }
  }, [messages, conversationId, isFirstRender]);

  return (
    <div className="messages-UI">
      <h2>
        {messages &&
          messages.length > 0 &&
          (messages[0].sender._id === user._id ? (
            <Link
              to={`/profile/${messages[0].recipient._id}`}
              className="recipient-name"
            >
              {messages[0].recipient.firstName} {messages[0].recipient.lastName}
            </Link>
          ) : (
            <Link
              to={`/profile/${messages[0].sender._id}`}
              className="recipient-name"
            >
              {messages[0].sender.firstName} {messages[0].sender.lastName}
            </Link>
          ))}
      </h2>
      <div className="messages-container">
        {messages && messages.length > 0 ? (
          <div>
            {messages.map((message) => (
              <Message
                key={message._id}
                message={message}
                user={user}
                onDelete={handleDeleteMessage}
                onUpdate={handleUpdateMessage}
              />
            ))}
          </div>
        ) : (
          <p className="chat-text">No messages to show. Start typing to exchange with this user.</p>
        )}
        <div ref={messagesEndRef} />
      </div>
      <input
        type="text"
        placeholder="Type your message here."
        value={newMessage}
        onChange={handleNewMessageChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        className="message-input"
      />
      <FontAwesomeIcon icon={faPaperPlane} className="send-icon" onClick={handleSendMessage}/>
    </div>
  );
}

export default ConvMessages;
