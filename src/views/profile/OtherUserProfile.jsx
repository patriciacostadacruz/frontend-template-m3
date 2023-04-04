import { useParams } from "react-router-dom";
import profileServices from "../../services/profileServices";
import reviewService from "../../services/reviewServices";
import { useState, useEffect } from "react";
import linkedin from "../../images/linkedin.png";
import Loading from "../../components/Loading";
import AddReview from "../../components/profile/AddReview";
import { toast } from "react-hot-toast";

function OtherUserProfile() {
  const { userId } = useParams();
  const [otherUser, setOtherUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isRating, setIsRating] = useState(false);
  const [loading, setLoading] = useState(false);
  const style = { height: "300px", width: "300px", objectFit: "cover" };

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await profileServices.getOtherUser(userId);
      setOtherUser(response.otherUser);
      setErrorMessage(null);
      setLoading(false);
    } catch (error) {
      setErrorMessage("Sorry, we couldn't get this user's profile.");
    }
  }

  useEffect(() => {
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleShowReviewForm = () => {
    setIsRating(true);
  };

  const handleCancel = () => {
    setIsRating(false);
  };

  const handleAddReview = async (review) => {
    try {
      await reviewService.addReview(review);
      setIsRating(false);
      toast.success("Review was added successfully.");
    } catch (error) {
      toast.error(error);
    }
  };
  
  return (
    <>
      {loading && <Loading />}
      {otherUser && (
        <>
          <div className="profile-data">
            <img style={style} src={otherUser.image} alt="Avatar" />
            <div className="profile-data-personal">
              <div className="profile-name-linkedin">
                <h2>
                  {otherUser.firstName} {otherUser.lastName}
                </h2>
                {otherUser.linkedIn && (
                  // using anchor to open page in new tab with blank target
                  <a href={otherUser.linkedIn} target="_blank" rel="noreferrer">
                    <img width="30" src={linkedin} alt="Linkedin profile" />
                  </a>
                )}
              </div>
              <p>
                <strong>Email: </strong>
                {otherUser.email}
              </p>
              <p>
                <strong>Role: </strong>
                {otherUser.role}
              </p>
            </div>
            <div className="profile-data-professional">
              <p>
                <strong>Company: </strong>
                {otherUser.company}
              </p>
              <p>
                <strong>Industry: </strong>
                {otherUser.industry.map((elem) => {
                  return (
                    <span key={otherUser.industry.indexOf(elem)}>{elem}</span>
                  );
                })}
              </p>
              <p>{otherUser.bio}</p>
            </div>
          </div>
          <button>Send message</button>
          {!isRating && otherUser && (
            <button onClick={handleShowReviewForm}>Rate user</button>
          )}
          {isRating && otherUser && (
            <AddReview
              personRated={otherUser._id}
              onCreation={handleAddReview}
              onCancel={handleCancel}
            />
          )}
          <div className="profile-projects">
            <h3>Projects</h3>
            {otherUser.userProjects ? (
              <p>projects</p>
            ) : (
              "This user has no active projects."
            )}
          </div>
          <div className="profile-reviews">
            <h3>Reviews</h3>
            {otherUser.userReviews ? (
              <p>reviews</p>
            ) : (
              "This user has no ratings."
            )}
          </div>
        </>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

export default OtherUserProfile;
