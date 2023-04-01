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
      console.log(otherUser)
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
          <h2>
            {otherUser.firstName} {otherUser.lastName}
          </h2>
          <p>
            <strong>Role:</strong> {otherUser.role}
          </p>
          <img src={otherUser.image} alt="Avatar" />
          <p>{otherUser.bio}</p>
          {otherUser.userProjects ? (
            <p>projects</p>
          ) : (
            "This user has no active projects."
          )}
          {otherUser.userReviews ? (
            <p>reviews</p>
          ) : (
            "This user hasn't been reviewed by other users yet."
          )}
        </div>
      )}
    </>
  );
}

export default OtherUserProfile;
