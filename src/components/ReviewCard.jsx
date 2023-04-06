import React from "react";

function ReviewCard({ review }) {
  const { title, personRating, rating, comment } = review;
  const style = {
    height: "70px",
    width: "70px",
    objectFit: "cover",
    borderRadius: "50px",
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
        <div className="review-info">
          <h3 className="review-name">{personRating.firstName} {personRating.lastName}</h3>
        </div>
      </div>
      <div className="review-content">
        <div className="review-subheader">
          <p className="review-title">
            <strong>{title}</strong>
          </p>
          <p className="review-rating">{rating}/5</p>
        </div>
        <p className="review-comment">{comment}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
