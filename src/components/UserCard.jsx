import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserCard = ({ user }) => {
  const { user: me } = useContext(AuthContext);
  const style = {height: "200px", width: "200px", objectFit: "cover", borderRadius: "15px"}
  
  return (
    <div className="user-card">
      {user._id === me._id ? (
        <Link to="/profile">
          <div className="user-card-data">
            <img style={style} src={user.image} alt={user.firstName} />
            <p>
              <strong>
                {user.firstName} {user.lastName}
              </strong>
            </p>
            <p>Role: {user.role}</p>
          </div>
        </Link>
      ) : (
        <Link to={`/profile/${user._id}`}>
          <div className="user-card-data">
            <img style={style} src={user.image} alt={user.firstName} />
            <p>
              <strong>
                {user.firstName} {user.lastName}
              </strong>
            </p>
            <p>Role: {user.role}</p>
          </div>
        </Link>
      )}
    </div>
  );
}

export default UserCard;
