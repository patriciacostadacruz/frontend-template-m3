import linkedin from "../../images/linkedin.png";

function ProfileData({ user }) {
  const style = { height: "300px", width: "300px", objectFit: "cover" };

  return (
    <>
      <div className="profile-data">
        <img style={style} src={user.image} alt="Avatar" />
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
    </>
  );
}

export default ProfileData;
