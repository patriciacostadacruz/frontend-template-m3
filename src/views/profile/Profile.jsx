import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import profileService from "../../services/profileServices";

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);


  const getProfile = async () => {
    try {
      const response = await profileService.getProfile();
      setProfileData(response)
    } catch (error) {
      setErrorMessage("Sorry, we couldn't retrieve your profile data. Please try again or navigate to another page.");
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>{profileData.email}</>
  );
}

export default Profile;
