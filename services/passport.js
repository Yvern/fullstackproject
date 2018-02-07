const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//load the User model using Mongoose
const User = mongoose.model('User');

/*
 * Serialize a user and store the serialized id in a cookie
 */
passport.serializeUser((user, done) => {
  //passport done callback with null for error and user.id to pass in
  //user.id is NOT the same as googleID, it's a shortcut to the MongoDB user _id
  //user.id then gets put into a cookie
  done(null, user.id);
});

/*
 * Deserialize a user from its id
 */
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

/*
 * Tells passport to use the Google strategy for logging in
 * Google Strategy created with personal ClientID and clientSecret
 * Google Strategy constructor requires a callback URL to redirect to after
 * getting permissions
 *
 * new User creates a new instance of the User model, .save() saves it to the
 * MongoDB database
 *
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });
      if (existingUser) {
        //this profile ID already exists, inform PassportJS that the call is
        //done with an error object and the user found
        return done(null, existingUser);
      }
      //no user record with this ID, make a new User instance and save to
      //MongoDB, then inform PassportJS that the call is done
      const user = await new User({ googleID: profile.id }).save();
      done(null, user);
    }
  )
);
