import { useState, useEffect, useContext, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import messengerServices from "../../services/messengerServices";
import { AuthContext } from "../../context/AuthContext";
import Message from "./Message";
import toast from "react-hot-toast";

function ConvMessages({ messagesFromFather }) {
  const [messages, setMessages] = useState(null);
  const messagesEndRef = useRef(null);
  // const { conversationId } = useParams();
  const { user } = useContext(AuthContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // const getMessages = async () => {
  //   try {
  //     const response = await messengerServices.getConvMessages(conversationId);
  //     if (response.error) {
  //       toast.error(response.error);
  //     } else {
  //       setMessages(response.messages);
  //     }
  //   } catch (error) {
  //     toast.error("Failed to fetch messages.");
  //   }
  // };

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
    // getMessages();
    scrollToBottom();
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
      {messagesFromFather && messagesFromFather.length > 0
        ? console.log(messagesFromFather)
        : ""}
      {messagesFromFather && messagesFromFather.length > 0 ? (
        <div>
          {messagesFromFather.map((message) => (
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
    </>
  );
}

export default ConvMessages;
