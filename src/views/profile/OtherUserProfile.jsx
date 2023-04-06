import { useParams, useNavigate } from "react-router-dom";
import profileServices from "../../services/profileServices";
import reviewService from "../../services/reviewServices";
import { useState, useEffect, useContext } from "react";
import linkedin from "../../images/linkedin.png";
import Loading from "../../components/Loading";
import AddReview from "../../components/profile/AddReview";
import { toast } from "react-hot-toast";
import ReviewCard from "../../components/ReviewCard";
import ProjectCard from "../../components/project/ProjectCard";
import messengerService from "../../services/messengerServices";
import { AuthContext } from "../../context/AuthContext";


function OtherUserProfile() {
  const { userId } = useParams();
  const [otherUser, setOtherUser] = useState(null);
  const [otherUserProjects, setOtherUserProjects] = useState(null);
  const [otherUserReviews, setOtherUserReviews] = useState(null);
  const [isRating, setIsRating] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const style = { height: "300px", width: "300px", objectFit: "cover" };

  const getUser = async () => {
    setLoading(true);
    try {
      console.log("from try")
      const response = await profileServices.getOtherUser(userId);
      if (response.error) {
        console.log("from 1st condition");
        toast.error(response.error);
        setLoading(false);
        navigate("/users");
        return;
      } else if (response.otherUser.status === "active") {
        console.log("from 2nd condition");
        setOtherUser(response.otherUser);
        setOtherUserProjects(response.userProjects);
        setOtherUserReviews(response.userReviews);
        setLoading(false);
      }
    } catch (error) {
      console.log("from catch");
      setLoading(false);
      toast.error("Sorry, we couldn't get this user's profile. It might be disabled or in maintenance.");
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

   const handleSendMessage = async () => {
     try {
       const conversation = await messengerService.createConversation(userId, {
         users: [user._id, userId],
       });
       if (conversation.error) {
        toast.error(conversation.error);
        navigate(`"/profile/${userId}`)
       }
       if (conversation.existingConversation) {
        navigate(`/messages/${conversation.existingConversation._id}`);
       }
       navigate(`/messages/${conversation._id}`);
     } catch (error) {
       console.log(error);
       toast.error("Sorry, we couldn't send your message.");
     }
   };

  // navigate(`/messages/${existingConversation._id}`);
  // navigate(`/messages/${newConversation._id}`);

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
          <button onClick={handleSendMessage}>Send message</button>
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
            {otherUserProjects.length > 0
              ? otherUserProjects.map((project) => {
                  return (
                    <ProjectCard project={project} key={`${project._id}1`} />
                  );
                })
              : "This user has no active projects."}
          </div>
          <div className="profile-reviews">
            <h3>Reviews</h3>
            {otherUserReviews.length > 0
              ? otherUserReviews.map((review) => {
                  return <ReviewCard review={review} key={`${review._id}1`} />;
                })
              : "This user has no ratings."}
          </div>
        </>
      )}
    </>
  );
}

export default OtherUserProfile;
