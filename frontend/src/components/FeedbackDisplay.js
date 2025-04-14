import React, { useEffect, useState } from "react";
import axios from "axios";

const FeedbackDisplay = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get("http://localhost:5000/api/feedback/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // If server returns an array directly:
        // setFeedback(res.data);

        // If server sometimes returns { message: "...", data: [...] }:
        setFeedback(Array.isArray(res.data) ? res.data : res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const groupByCategory = (category) =>
    feedback.filter((f) => f.category === category);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Submitted Feedback</h2>

      {["Product Features", "Product Pricing", "Product Usability"].map(
        (cat) => (
          <div key={cat} style={{ marginBottom: "2rem" }}>
            <h3>{cat}</h3>
            {groupByCategory(cat).length === 0 ? (
              <p>No feedback yet.</p>
            ) : (
              groupByCategory(cat).map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    border: "1px solid #ccc",
                    padding: "1rem",
                    margin: "0.5rem 0",
                  }}
                >
                  <strong>Rating:</strong> {item.rating}⭐ <br />
                  <strong>Comment:</strong> {item.comment} <br />
                  <small>{new Date(item.time).toLocaleString()}</small>
                </div>
              ))
            )}
          </div>
        )
      )}
    </div>
  );
};

export default FeedbackDisplay;
