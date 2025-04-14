// frontend/src/components/Login.js
import React from "react";

const Login = () => {
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
