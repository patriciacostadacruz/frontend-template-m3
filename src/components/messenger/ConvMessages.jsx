import { useState, useEffect, useContext, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import messengerServices from "../../services/messengerServices";
import { AuthContext } from "../../context/AuthContext";
import Message from "./Message";
import toast from "react-hot-toast";
import Loading from "../Loading";

function ConvMessages() {
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { conversationId } = useParams();
  const { user } = useContext(AuthContext);

  const getMessages = async () => {
    setIsLoading(true);
    try {
      const response = await messengerServices.getConvMessages(conversationId);
      if (response.error) {
        toast.error(response.error);
        setIsLoading(false);
      } else {
        setMessages(response.messages);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Failed to fetch messages.");
      setIsLoading(false);
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
      console.log(thisConversation)
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
        setNewMessage("");
        getMessages();
      }
    } catch (error) {
      toast.error("Failed to send message.");
      console.log(error);
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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getMessages();
  //   }, 2000);
  //   scrollToBottom();
  //   return () => clearInterval(interval);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [messages]);

  return (
    <>
      <h2>
        {messages &&
          messages.length > 0 &&
          (messages[0].sender._id === user._id ? (
            <Link to={`/profile/${messages[0].recipient._id}`}>
              {messages[0].recipient.firstName} {messages[0].recipient.lastName}
            </Link>
          ) : (
            <Link to={`/profile/${messages[0].sender._id}`}>
              {messages[0].sender.firstName} {messages[0].sender.lastName}
            </Link>
          ))}
      </h2>
      {isLoading && <Loading />}
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
        "No messages to show."
      )}
      {!isLoading && (
        <input
          type="text"
          placeholder="Type your message here."
          value={newMessage}
          onChange={handleNewMessageChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      )}
      <div ref={messagesEndRef} />
    </>
  );
}

export default ConvMessages;
