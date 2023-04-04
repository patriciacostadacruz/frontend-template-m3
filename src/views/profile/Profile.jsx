import { useEffect, useState } from "react";
import profileService from "../../services/profileServices";
import ProfileData from "../../components/profile/ProfileData";
import EditProfileData from "../../components/profile/EditProfileData";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";

function Profile() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdate = async (updatedUser) => {
    try {
      const updatedMe = await profileService.editProfile(updatedUser);
      setUser(updatedMe);
      setIsEditing(false);
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      {!isEditing && user && (
        <>
          <ProfileData user={user} />
          <button onClick={handleEdit}>Edit profile</button>
        </>
      )}
      {isEditing && user && (
        <EditProfileData
          user={user}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      )}
      {errorMessage && <p>{errorMessage}</p>}
      {/* <div className="profile-projects">
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
      </div> */}
    </div>
  );
}

export default Profile;
