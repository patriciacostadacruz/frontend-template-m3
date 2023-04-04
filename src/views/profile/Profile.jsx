import { useEffect, useState } from "react";
import profileService from "../../services/profileServices";
import ProfileData from "../../components/profile/ProfileData";
import Loading from "../../components/Loading";

function Profile() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await profileService.getProfile();
      setUser(response.user);
      setLoading(false);
    } catch (error) {
      setErrorMessage("Sorry, we couldn't retrieve your profile data. Please try again.");
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      {loading && <Loading />}
      {user && <ProfileData user={user} />}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Profile;
