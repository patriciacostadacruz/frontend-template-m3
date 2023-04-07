import Loading from "../../components/Loading";
import { useState, useEffect, useContext } from "react";
import messengerServices from "../../services/messengerServices";
import { Link } from "react-router-dom";
import checkmark from "../../images/checkmark.png";
import { AuthContext } from "../../context/AuthContext";

function Conversations() {
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

  useEffect(() => {
    getConversations();
  }, []);

  const filteredConversations = conversations.filter((conversation) => {
    // the first user added to the users array ALWAYS is the recipient
    const firstName = conversation.users[0].firstName.toLowerCase();
    const lastName = conversation.users[0].lastName.toLowerCase();
    const searchLowerCase = search.toLowerCase();
    return (
      firstName.includes(searchLowerCase) ||
      lastName.includes(searchLowerCase)
    );
  });

  return (
    <>
      <h2>Conversations</h2>
      <input
        type="text"
        placeholder="Search by recipient's name"
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && <Loading />}
      {errorMessage && <p>{errorMessage}</p>}
      {!loading && filteredConversations.length > 0 ? (
        <div>
          {filteredConversations.map((conversation) => (
            <Link
              to={`/messages/${conversation._id}`}
              key={`${conversation._id}2`}
            >
              <div className="small-profile-picture">
                <img
                  style={style}
                  src={conversation.users[0].image}
                  alt="Small avatar"
                />
              </div>
              <div className="conversation-last-message">
                <p>
                  <strong>
                    {conversation.users[0].firstName}{" "}
                    {conversation.users[0].lastName}
                  </strong>
                </p>
                <p>
                  {conversation.messages[0].sender._id === user._id ? (
                    <img width="20" src={checkmark} alt="Message checkmark" />
                  ) : null}
                  {conversation.messages[0].content}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        "No conversations to show."
      )}
    </>
  );
}

export default Conversations;
