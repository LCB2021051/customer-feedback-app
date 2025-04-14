// backend/routes/feedbackRoutes.js
const express = require("express");
const passport = require("passport");
const feedbackController = require("../controllers/feedbackController");

const router = express.Router();

// Step 1: Start Google OAuth
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Step 2: Google OAuth callback
// IMPORTANT: here we call feedbackController.googleCallback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  feedbackController.googleCallback
);

// Step 3: Protected route /me (needs JWT)
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  feedbackController.me
);

// Step 4: Protected POST /submit
router.post(
  "/submit",
  passport.authenticate("jwt", { session: false }),
  feedbackController.submitFeedback
);

// Step 5: Protected GET /all
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  feedbackController.getAllFeedback
);

module.exports = router;
