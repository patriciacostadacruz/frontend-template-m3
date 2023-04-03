import { useParams } from "react-router-dom";
import profileServices from "../../services/profileServices";
import { useState, useEffect } from "react";
import linkedin from "../../images/linkedin.png";

function OtherUserProfile() {
  const { userId } = useParams();
  const [otherUser, setOtherUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const getUser = async () => {
    try {
      const response = await profileServices.getOtherUser(userId);
      setOtherUser(response.otherUser);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error);
    }
  }

  useEffect(() => {
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <>
      <div className="profile-data">
        <img height="250" src={otherUser.image} alt="Avatar" />
        <div className="profile-data-personal">
          <div className="profile-name-linkedin">
            <h2>
              {otherUser.firstName} {otherUser.lastName}
            </h2>
            {otherUser.linkedIn && (
              // using anchor to open page in new tab with blank target
              <a href={otherUser.linkedIn} target="_blank" rel="noreferrer">
                <img width="30" src={linkedin} alt="Linkedin profile" />
              </a>
            )}
          </div>
          <p>
            <strong>Email: </strong>
            {otherUser.email}
          </p>
          <p>
            <strong>Role: </strong>
            {otherUser.role}
          </p>
        </div>
        <div className="profile-data-professional">
          <p>
            <strong>Company: </strong>
            {otherUser.company}
          </p>
          <p>
            <strong>Industry: </strong>
            {otherUser.industry.map((elem) => {
              return <span key={otherUser.industry.indexOf(elem)}>{elem}</span>;
            })}
          </p>
          <p>{otherUser.bio}</p>
        </div>
      </div>
      <button>Send message</button>
      <button>Rate user</button>
      <div className="profile-projects">
        <h3>Projects</h3>
        {otherUser.userProjects ? (
          <p>projects</p>
        ) : (
          "You havent added any project yet."
        )}
      </div>
      <div className="profile-reviews">
        <h3>Reviews</h3>
        {otherUser.userReviews ? (
          <p>reviews</p>
        ) : (
          "You haven't been reviewed by other users yet."
        )}
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

export default OtherUserProfile;
