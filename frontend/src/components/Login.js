// frontend/src/components/Login.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("authToken", token);

      window.history.replaceState({}, "", "/");

      navigate("/feedback");
    }
  }, [navigate]);

  const handleLogin = () => {
    window.open("http://localhost:5000/api/feedback/auth/google", "_self");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Welcome to the Customer Feedback Portal</h2>
      <button
        onClick={handleLogin}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
