const express = require("express");
const passport = require("passport");
const axios = require("axios");

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000/feedback");
  }
);

router.get("/me", (req, res) => {
  res.json(req.user);
});

router.post("/submit", async (req, res) => {
  const { category, rating, comment } = req.body;
  console.log("Received Feedback:", { category, rating, comment });

  try {
    // Mock or real Frill API submission
    const response = await axios.post(
      "https://api.frill.co/v1/ideas",
      {
        title: `${category} - ${rating}⭐`,
        body: comment,
        board_id: process.env.FRILL_BOARD_ID,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FRILL_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res
      .status(200)
      .json({ message: "Feedback submitted to Frill!", data: response.data });
  } catch (error) {
    console.error("Frill API Error:", error.response?.data || error.message);
    return res
      .status(500)
      .json({ message: "Error submitting feedback to Frill" });
  }
});

module.exports = router;
