import Loading from "../../components/Loading";
import { useState, useEffect } from "react";
import messengerServices from "../../services/messengerServices";
import { Link } from "react-router-dom";

function Conversations() {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const style = { height: "100px", width: "100px", objectFit: "cover", borderRadius: "50px" };

  const getConversations = async () => {
    setLoading(true);
    try {
      const response = await messengerServices.getConversations();
      console.log(response.conversations);
      setConversations(response.conversations);
      setLoading(false);
    } catch (error) {
      setErrorMessage("Failed to fetch conversations");
      setLoading(false);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <>
      <h2>Conversations</h2>
      {loading && <Loading />}
      {errorMessage && <p>{errorMessage}</p>}
      {!loading && conversations.length > 0 ? (
        <div>
          {conversations.map((conversation) => (
            <Link
              to={`/messages/${conversation._id}`}
              key={`${conversation._id}2`}
            >
              <div className="small-profile-picture">
                <img style={style} src={conversation.users[0].image} alt="Small avatar" />
              </div>
              <div className="conversation-last-message">
                <p>
                  <strong>
                    {conversation.users[0].firstName}{" "}
                    {conversation.users[0].lastName}
                  </strong>
                </p>
                <p>
                  {
                    conversation.messages[conversation.messages.length - 1]
                      .content
                  }
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
