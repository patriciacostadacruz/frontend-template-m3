import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserCard = ({ user }) => {
  const { user: me } = useContext(AuthContext);
  const style = {height: "200px", width: "200px", objectFit: "cover"}
  
  return (
    <div className="user-card">
      <img style={style} src={user.image} alt={user.firstName} />
      {user._id === me._id ? (
        <Link to="/profile">
          {user.firstName} {user.lastName}
        </Link>
      ) : (
        <Link to={`/profile/${user._id}`}>
          {user.firstName} {user.lastName}
        </Link>
      )}
      <p>
        <strong>Role: </strong>
        {user.role}
      </p>
    </div>
  );
}

export default UserCard;
