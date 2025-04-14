import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <nav
      style={{
        padding: "1rem",
        backgroundColor: "#f4f4f4",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Link to="/profile" style={{ marginRight: "1rem" }}>
          Profile
        </Link>
        <Link to="/feedback" style={{ marginRight: "1rem" }}>
          Feedback
        </Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
