// backend/app.js
const express = require("express");
const passport = require("passport");
const cors = require("cors");

// Load Passport strategies (Google + JWT)
require("./config/passport");
require("./config/jwtStrategy");

const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

// CORS to allow frontend at localhost:3000
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Parse JSON body
app.use(express.json());

// No session usage; purely JWT
app.use(passport.initialize());

// Routes
app.use("/api/feedback", feedbackRoutes);

app.get("/", (req, res) => res.send("API Running"));

module.exports = app;
