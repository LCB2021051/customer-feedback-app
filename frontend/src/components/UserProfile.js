// frontend/src/components/UserProfile.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Grab token from localStorage
    const token = localStorage.getItem("authToken");
    if (!token) return;

    axios
      .get("http://localhost:5000/api/feedback/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Not logged in:", err));
  }, []);

  if (!user) {
    return <p style={{ textAlign: "center" }}>Loading user info...</p>;
  }

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "2rem" }}>
      <h2>User Profile</h2>
      {user.photos?.[0]?.value && (
        <img
          src={user.photos[0].value}
          alt="Profile"
          style={{ borderRadius: "50%", width: "100px", marginBottom: "1rem" }}
        />
      )}
      <p>
        <strong>Name:</strong> {user.displayName}
      </p>
      <p>
        <strong>Email:</strong> {user.emails?.[0]?.value}
      </p>
      <p>
        <strong>Google ID:</strong> {user.id}
      </p>
    </div>
  );
};

export default UserProfile;
