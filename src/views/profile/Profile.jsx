import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import profileService from "../../services/profileServices";
import ProfileData from "../../components/profile/ProfileData";

function Profile() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);


  const getProfile = async () => {
    try {
      const response = await profileService.getProfile();
      setUser(response.user)
    } catch (error) {
      setErrorMessage("Sorry, we couldn't retrieve your profile data. Please try again");
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      {user && <ProfileData user={user}/>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Profile;
