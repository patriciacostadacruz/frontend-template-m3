import { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Loading from "../../components/Loading";
import messengerServices from "../../services/messengerServices";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCheckDouble,
  faArrowsRotate
} from "@fortawesome/free-solid-svg-icons"; 

const Conversations = () => {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [search, setSearch] = useState("");
  const { user } = useContext(AuthContext);
  const style = {
    height: "100px",
    width: "100px",
    objectFit: "cover",
    borderRadius: "50px",
  };

  const getConversations = async () => {
    setLoading(true);
    try {
      const conversations = await messengerServices.getConversations();
      setConversations(conversations);
      setLoading(false);
    } catch (error) {
      setErrorMessage("Failed to fetch conversations");
      setLoading(false);
    }
  };

  const filteredConversations = conversations.filter((conversation) => {
    const firstName = conversation.users[0].firstName.toLowerCase();
    const lastName = conversation.users[0].lastName.toLowerCase();
    const searchLowerCase = search.toLowerCase();
    const isActive = conversation.users.map(
      (user) => user.status !== "inactive"
    );
    return (
      (firstName.includes(searchLowerCase) ||
        lastName.includes(searchLowerCase)) &&
      isActive
    );
  }).sort((a,b) => {
    const first = new Date(a.messages[0]?.createdAt)
    const second = new Date(b.messages[0]?.createdAt);
    return second - first;
  });

  const formatMessageDate = (date) => {
    const messageDate = new Date(date);
    const currentDate = new Date();
    const isToday =
      messageDate.getDate() === currentDate.getDate() &&
      messageDate.getMonth() === currentDate.getMonth() &&
      messageDate.getFullYear() === currentDate.getFullYear();
    if (isToday) {
      const hours = messageDate.getHours();
      const minutes = messageDate.getMinutes();
      const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}`;
      return formattedTime;
    } else {
      const month = messageDate.toLocaleString("default", { month: "short" });
      const day = messageDate.getDate();
      const formattedDate = `${month} ${day}`;
      return formattedDate;
    }
  }

  const getOtherUser = (conversation) => {
    return conversation.users.find((person) => person._id !== user._id);
  };

  const lastMessageSentByCurrentUser = (conversation) => {
    const lastMessage = conversation.messages[0];
    return (
      lastMessage.sender._id === user._id &&
      lastMessage.sender.firstName === user.firstName
    );
  };

  const handleRefresh = () => {
    window.location.reload(false);
  }

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="conv-section">
        {errorMessage && <p>{errorMessage}</p>}
        {!loading && filteredConversations.length > 0 ? (
          <div className="conv-container">
            <div className="search-conv">
              <FontAwesomeIcon icon={faMagnifyingGlass} />{" "}
              <input
                type="text"
                placeholder="Search by recipient's name"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button type="button" onClick={handleRefresh}><FontAwesomeIcon icon={faArrowsRotate} /> Reload conversations</button>
            <div className="conv-summary">
              {filteredConversations.map((conversation) => {
                const otherUser = getOtherUser(conversation);
                return (
                  <Link
                    to={`/conversations/${conversation._id}`}
                    key={`${conversation._id}2`}
                    className="conversation"
                  >
                    <div>
                      <img
                        style={style}
                        src={otherUser.image}
                        alt="Small avatar"
                      />
                    </div>
                    <div className="conversation-last-message">
                      <div className="conversation-header">
                        <p>
                          <strong>
                            {otherUser.firstName} {otherUser.lastName}
                          </strong>
                        </p>
                        {conversation.messages[0] && (
                          <p>
                            {formatMessageDate(
                              conversation.messages[0].createdAt
                            )}
                          </p>
                        )}
                      </div>
                      {conversation.messages[0] && (
                        <p className="message-preview">
                          {lastMessageSentByCurrentUser(conversation) && (
                            <FontAwesomeIcon icon={faCheckDouble} />
                          )}{" "}
                          {/* always displays last messsage because of how it is sorted when pulled form DB */}
                          {conversation.messages[0].content}
                        </p>
                      )}
                      {!conversation.messages[0] && (
                        <p style={{ fontWeight: "normal" }}>
                          No message to show.
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
        <Outlet />
        {filteredConversations && filteredConversations.length < 1 && (
          <p>No conversations to display.</p>
        )}
      </div>
    </>
  );
}

export default Conversations;
