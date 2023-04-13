import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ReviewCard = ({ review }) => {
  const { title, personRating, rating, comment } = review;
  const style = {
    height: "70px",
    width: "70px",
    objectFit: "cover",
    borderRadius: "50px",
  };
  const { user } = useContext(AuthContext);

  const printStars = (num) => {
    let stars = "";
    for (let i=0; i<num; i++) {
      stars += "⭐️";
    }
    return stars;
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <img
          style={style}
          className="review-avatar"
          src={personRating.image}
          alt={`${personRating.firstName}'s avatar`}
        />
        {user._id === personRating._id ? (
          <Link to="/profile">
            <h5 className="review-name">
              {personRating.firstName} {personRating.lastName}
            </h5>
          </Link>
        ) : (
          <Link to={`/profile/${personRating._id}`}>
            <h5 className="review-name">
              {personRating.firstName} {personRating.lastName}
            </h5>
          </Link>
        )}
      </div>
      <div className="review-content">
        <div className="review-subheader">
          <p className="review-title">
            <strong>{title}</strong>
          </p>
          <p className="review-rating">{printStars(rating)}</p>
        </div>
        <p className="review-comment">{comment}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
