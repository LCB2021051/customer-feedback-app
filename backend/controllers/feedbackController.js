const axios = require("axios");
const jwt = require("jsonwebtoken");

let feedbackList = [];

exports.googleCallback = (req, res) => {
  const token = jwt.sign(
    {
      id: req.user.id,
      displayName: req.user.displayName,
      emails: req.user.emails,
      photos: req.user.photos,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const redirectUrl = `http://localhost:3000/feedback?token=${token}`;
  return res.redirect(redirectUrl);
};

exports.me = (req, res) => {
  res.json(req.user);
};

exports.submitFeedback = async (req, res) => {
  const { category, rating, comment } = req.body;
  const entry = { category, rating, comment, time: new Date().toISOString() };

  feedbackList.push(entry);
  console.log("Saved locally:", entry);

  try {
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

    console.log("Submitted to Frill:", response.data);

    return res.status(200).json({
      message: "Feedback submitted to Frill and stored locally.",
      data: response.data,
    });
  } catch (error) {
    console.error("Frill API Error:", error.response?.data || error.message);

    return res.status(500).json({
      message: "Failed to save on Frill, but data stored locally.",
      error: error.response?.data || error.message,
    });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const frillResponse = await axios.get("https://api.frill.co/v1/ideas", {
      headers: {
        Authorization: `Bearer ${process.env.FRILL_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const frillIdeas = frillResponse.data.data;

    const frillFormatted = frillIdeas.map((idea) => {
      const ratingMatch = idea.title.match(/(\d)⭐/);
      const rating = ratingMatch ? ratingMatch[1] : null;

      return {
        source: "frill",
        title: idea.title,
        comment: idea.body,
        rating: rating,
        time: idea.created_at,
      };
    });

    const localFormatted = feedbackList.map((entry) => ({
      ...entry,
      source: "local",
    }));

    const combined = [...localFormatted, ...frillFormatted];

    return res.status(200).json(combined);
  } catch (error) {
    console.error("Frill API Error:", error.response?.data || error.message);

    return res.status(500).json({
      message: "Failed to fetch from Frill, returning local data.",
      data: feedbackList,
    });
  }
};
