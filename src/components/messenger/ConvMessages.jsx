import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import messengerServices from "../../services/messengerServices";
import { AuthContext } from "../../context/AuthContext";
import Message from "./Message";
import toast from "react-hot-toast";

function ConvMessages({ messagesFromFather }) {
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
        toast.error("We could not delete this message.");
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
          <div ref={messagesEndRef} />
        </div>
      ) : (
        "No messages to show."
      )}
      <input
        type="text"
        placeholder="Type your message here."
        value={newMessage}
        onChange={handleNewMessageChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
    </>
  );
}

export default ConvMessages;
