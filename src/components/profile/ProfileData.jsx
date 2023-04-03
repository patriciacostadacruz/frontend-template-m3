import linkedin from "../../images/linkedin.png";

function ProfileData({ user }) {

  return (
    <>
      <div className="profile-data">
        <img height="250" src={user.image} alt="Avatar" />
        <div className="profile-data-personal">
          <div className="profile-name-linkedin">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            {user.linkedIn && (
              // using anchor to open page in new tab with blank target
              <a href={user.linkedIn} target="_blank" rel="noreferrer">
                <img width="30" src={linkedin} alt="Linkedin profile" />
              </a>
            )}
          </div>
          <p><strong>Email: </strong>{user.email}</p>
          <p><strong>Password: </strong>********</p>
          <p><strong>Role: </strong>
            {user.role}
          </p>
        </div>
        <div className="profile-data-professional">
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
      <button>Edit profile</button>
      <div className="profile-projects">
        <h3>Projects</h3>
        {user.userProjects ? (
          <p>projects</p>
        ) : (
          "You havent added any project yet."
        )}
      </div>
      <div className="profile-reviews">
        <h3>Reviews</h3>
        {user.userReviews ? (
          <p>reviews</p>
        ) : (
          "You haven't been reviewed by other users yet."
        )}
      </div>
    </>
  );
}

export default ProfileData;
