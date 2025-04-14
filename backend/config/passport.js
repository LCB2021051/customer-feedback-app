// backend/config/passport.js
require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/feedback/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // Typically, you'd find/create a user in DB here. For now, just pass the profile:
      return done(null, profile);
    }
  )
);

// No serializeUser/deserializeUser needed for JWT-based approach
