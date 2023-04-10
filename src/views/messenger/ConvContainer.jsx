import { useState, useContext, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import messengerServices from "../../services/messengerServices";
import profileServices from "../../services/profileServices";
import { AuthContext } from "../../context/AuthContext";
import ConvMessages from "../../components/messenger/ConvMessages";
import toast from "react-hot-toast";

function ConvContainer() {
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [otherUser, setOtherUser] = useState(null);
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

  const getOtherUser =  async () => {
    let otherUserId;
    // get the other user ID by returning the one not equal to logged user ID
    if (messages.length > 0) {
      const firstMessage = messages[0];
      if (firstMessage.sender._id === user._id) {
         otherUserId = firstMessage.recipient._id;
      } else {
        otherUserId = firstMessage.sender._id;
      }
    }
    if (otherUserId) {
      try {
        const response = await profileServices.getOtherUser(otherUserId);
        setOtherUser(response.otherUser);
      } catch (error) {
        toast.error("Failed to get other user data.");
      }
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

	useEffect(() => {
    getMessages();
    getOtherUser();
    console.log(otherUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {messages ? (
        <h2>
          {otherUser && (
            <Link to={`/profile/${otherUser._id}`}>
              name {otherUser.firstName} {otherUser.lastName}
            </Link>
          )}
        </h2>
      ) : (
        <p>New conversation</p>
      )}
      {messages && <ConvMessages messagesFromFather={messages} />}
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
