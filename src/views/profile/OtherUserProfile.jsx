import { useParams } from "react-router-dom";
import profileServices from "../../services/profileServices";
import { useState, useEffect } from "react";

function OtherUserProfile() {
  const { userId } = useParams();
  const [otherUser, setOtherUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await profileServices.getOtherUser(userId);
      setOtherUser(response.otherUser);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <>
      {otherUser && (
        <div>
          <p>
            {otherUser.firstName} {otherUser.lastName}
          </p>
          <img src={otherUser.image} alt="Avatar"/>
        </div>
      )}
    </>
  );
}

export default OtherUserProfile;
