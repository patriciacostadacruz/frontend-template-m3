import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBan } from "@fortawesome/free-solid-svg-icons"; 

const AddReview = ({ personRated, onCreation, onCancel }) => {
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState({
    title: "",
    rating: 0,
    comment: "",
    personRating: user._id,
    personRated: personRated,
  });

  const handleInputChange = (e) => {
    setReview((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!review.title || !review.comment || !review.personRating || !review.personRated) {
      toast.error("Please fill all the fields requested to add a review.");
    }
    if (review.rating < 0 || review.rating > 5) {
      toast.error("You should choose a note between 0 and 5.");
    } 
    if (typeof review.title !== "string" || typeof review.comment !== "string") {
      toast.error("Please add a valid title and comment.");
    } else {
      onCreation(review);
    }
  };

  return (
    <div>
      <h2>Add a review</h2>
      <form onSubmit={handleSubmit}>
        <div className="review-form">
          <label>
            <strong>Title</strong>
          </label>
          <input
            required
            type="text"
            name="title"
            value={review.title}
            onChange={handleInputChange}
          />
          <label>
            <strong>Rating</strong>
          </label>
          <select
            required
            name="rating"
            value={review.rating}
            onChange={handleInputChange}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <textarea
            required
            name="comment"
            columns="30"
            rows="5"
            value={review.comment}
            placeholder="Write your comments here"
            onChange={handleInputChange}
          />
        </div>
        <div className="review-buttons">
          <button type="submit">
            <FontAwesomeIcon icon={faStar} /> Add review
          </button>
          <button type="button" onClick={onCancel}>
            <FontAwesomeIcon icon={faBan} /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddReview;
