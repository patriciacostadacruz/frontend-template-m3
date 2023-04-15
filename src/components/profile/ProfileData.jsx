import { useState, useContext } from "react";
import toast from "react-hot-toast";
import EditPassword from "../profile/EditPassword";
import profileService from "../../services/profileServices";
import authService from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import linkedin from "../../images/linkedin.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUserCheck } from "@fortawesome/free-solid-svg-icons"; 

const ProfileData = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = useState(null);
  const { storeToken, removeToken, authenticateUser } =
    useContext(AuthContext);
  const style = { height: "300px", width: "300px", objectFit: "cover", borderRadius: "5px" };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdate = async (updatedPassword) => {
    try {
      const updatedPass = await profileService.editPassword(updatedPassword);
      if (updatedPass.error) {
        toast.error(updatedPass.error);
      } else if (updatedPass.authToken) {
        removeToken();
        storeToken(updatedPass.authToken);
        authenticateUser();
        await authService.me();
        setIsEditing(false);
        setPassword(updatedPass);
        toast.success("Password updated successfully.");
      }
    } catch (error) {
      toast.error("Couldn't update your password. Try again later.");
    }
  };

  return (
    <>
      <div className="profile-data">
        <img style={style} src={user.image} alt="Avatar" />
        <div className="profile-data-personal">
          <div className="name-linkedin">
            <h4>
              {user.firstName} {user.lastName}
            </h4>
            {user.role && user.role === "investor" && (
              <FontAwesomeIcon icon={faUserCheck} />
            )}
            {user.linkedIn && (
              // using anchor to open page in new tab with blank target
              <a href={user.linkedIn} target="_blank" rel="noreferrer">
                <img width="30" src={linkedin} alt="Linkedin profile" />
              </a>
            )}
          </div>
          <p>
            <strong>Email </strong>
            {user.email}
          </p>
          {!isEditing ? (
            <div className="change-pass-section">
              <p>
                <strong>Password</strong> ********
              </p>
              <button onClick={handleEdit}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </div>
          ) : (
            <EditPassword onUpdate={handleUpdate} onCancel={handleCancel} />
          )}
          <p>
            <strong>Role </strong>
            {user.role}
          </p>
        </div>
        <div className="profile-data-professional">
          <p>
            <strong>Company </strong>
            {user.company}
          </p>
          <p>
            <strong>Industry </strong>
            {user.industry.map((elem) => {
              return (
                <span
                  key={user.industry.indexOf(elem)}
                  className="industry-tag"
                >
                  {elem}
                </span>
              );
            })}
          </p>
          <p className="bio">"{user.bio}"</p>
        </div>
      </div>
    </>
  );
}

export default ProfileData;
