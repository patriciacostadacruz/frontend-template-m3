import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

function AddReview({ personRated, onCreation, onCancel }) {
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
      <h3>Add a review</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            required
            type="text"
            name="title"
            value={review.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Rating</label>
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
        </div>
        <div>
          <label>Comment</label>
          <textarea
            required
            name="comment"
            column="30"
            rows="10"
            value={review.comment}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add review</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddReview;
