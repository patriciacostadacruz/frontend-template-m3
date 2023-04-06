import Password from "../profile/Password";
import EditPassword from "../profile/EditPassword";
import linkedin from "../../images/linkedin.png";
import profileService from "../../services/profileServices";
import { useState } from "react";
import toast from "react-hot-toast";

function ProfileData({ user }) {
  const style = { height: "300px", width: "300px", objectFit: "cover" };
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState(null);

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
      } else {
        setIsEditing(false);
        setPassword(updatedPass);
        toast.success("Password updated seccessfully.");
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
          <p>
            <strong>Email: </strong>
            {user.email}
          </p>
          {!isEditing ? (
            <>
              <Password />
              <button onClick={handleEdit}>Change password</button>
            </>
          ) : (
            <EditPassword onUpdate={handleUpdate} onCancel={handleCancel} />
          )}
          <p>
            <strong>Role: </strong>
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
