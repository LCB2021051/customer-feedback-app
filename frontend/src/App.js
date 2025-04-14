// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
// frontend/src/App.js
import FeedbackForm from "./components/FeedbackForm";
// ...

// (add FeedbackForm later)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/feedback" element={<FeedbackForm />} />
      </Routes>
    </Router>
  );
}

export default App;
