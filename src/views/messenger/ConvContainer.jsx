import { useState, useContext, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import messengerServices from "../../services/messengerServices";
import { AuthContext } from "../../context/AuthContext";
import ConvMessages from "../../components/messenger/ConvMessages";
import toast from "react-hot-toast";

function ConvContainer() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
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

	useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2>
        Conversation with{" "}
        {/* <Link to={`/users/${messages[0].recipient._id}`}>
          {messages[0].recipient.name}
        </Link> */}
      </h2>
      <ConvMessages />
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

export default ConvContainer;
