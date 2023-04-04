import React from "react";

function ReviewCard({ review }) {
  const { personRating, rating, comment, createdAt } = review;

  return (
    <div className="review-card">
      <div className="review-header">
        <img
          className="review-avatar"
          src={personRating.avatar}
          alt={`${personRating.name}'s avatar`}
        />
        <div className="review-info">
          <h3 className="review-name">{personRating.name}</h3>
          <p className="review-date">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="review-content">
        <p className="review-rating">{rating}/5</p>
        <p className="review-comment">{comment}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
