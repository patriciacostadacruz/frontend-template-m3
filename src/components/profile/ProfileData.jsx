import { Link } from "react-router-dom";
import linkedin from "../../images/linkedin.png"

function ProfileData({ user }) {
  const handleLinkedIn = () => {
    window.location.href = `${user.linkedIn}`;
  }

  return (
    <>
      <div>
        <img height="250" src={user.image} alt="Avatar" />
        <div>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>
            <strong>Role: </strong>
            {user.role}
          </p>
          {user.linkedIn && (
            // using anchor to open page in new tab with blank target
            <a href={user.linkedIn} target="_blank" rel="noreferrer">
              <img width="30" src={linkedin} alt="Linkedin profile" />
            </a>
          )}
        </div>
        <div>
          <p>
            <strong>Company: </strong>
            {user.company}
          </p>
          <p>
            <strong>Industry: </strong>
            {user.industry.map((elem) => {
              return <span key={user.industry.indexOf(elem)}>{elem}</span>;
            })}
          </p>
          <p>{user.bio}</p>
        </div>
      </div>
      {user.userProjects ? (
        <p>projects</p>
      ) : (
        "You havent added any project yet."
      )}
      {user.userReviews ? (
        <p>reviews</p>
      ) : (
        "You haven't been reviewed by other users yet."
      )}
    </>
  );
}

export default ProfileData;
