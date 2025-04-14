import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackDisplay from "./components/FeedbackDisplay";
import Navbar from "./components/Navbar";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/dashboard" element={<FeedbackDisplay />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
