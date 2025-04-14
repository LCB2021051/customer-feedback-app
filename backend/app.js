// backend/app.js
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("./config/passport"); // Passport config

const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

// backend/app.js (update CORS middleware)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// Session middleware
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/feedback", feedbackRoutes);
app.get("/", (req, res) => res.send("API Running"));

module.exports = app;
