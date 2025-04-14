// frontend/src/components/FeedbackForm.js
import React, { useState } from "react";
import axios from "axios";

const FeedbackForm = () => {
  const [category, setCategory] = useState("Product Features");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedback = { category, rating, comment };

    try {
      await axios.post("http://localhost:5000/api/feedback/submit", feedback, {
        withCredentials: true,
      });
      alert("Feedback submitted successfully!");
      setComment("");
    } catch (err) {
      console.error(err);
      alert("Error submitting feedback");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h2>Submit Your Feedback</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Product Features</option>
            <option>Product Pricing</option>
            <option>Product Usability</option>
          </select>
        </label>
        <br />
        <br />
        <label>
          Rating (1–5):
          <input
            type="number"
            value={rating}
            min="1"
            max="5"
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
