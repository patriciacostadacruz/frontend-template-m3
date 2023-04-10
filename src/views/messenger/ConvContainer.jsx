import { useState, useContext, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import messengerServices from "../../services/messengerServices";
import { AuthContext } from "../../context/AuthContext";
import ConvMessages from "../../components/messenger/ConvMessages";

function ConvContainer() {
  const [otherUser, setOtherUser] = useState(null);
  const { user } = useContext(AuthContext);

  const getOtherUser = async () => {
    let otherUserId;
    try {
      //
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    getOtherUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <>
      {/* {messages ? (
        <h2>
          {otherUser && (
            <Link to={`/profile/${otherUser._id}`}>
              name {otherUser.firstName} {otherUser.lastName}
            </Link>
          )}
        </h2>
      ) : (
        <p>New conversation</p>
      )} */}
      <ConvMessages />
    </>
  );
}

export default ConvContainer;
