const express = require("express");
const router = express.Router();
// Bring in mongoose keys
const keys = require("../../config/keys");
// Bring in User model
const User = require("../../models/User");
// Bring in bcrypt to encrypt the password
const bcrypt = require("bcryptjs");
// Bring in json web tokens
const jwt = require("jsonwebtoken");
// Bring in passport
const passport = require("passport");

// ******************* ROUTE GOES HERE *******************

// @route POST /api/users/register
// @description Register User
// @access Public
router.post("/register", (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(data => {
    // If the email address exists, return a 400 request
    if (data) {
      return res.status(400).json("Email address already exists!");
    }
    // Else, create a new user
    else {
      // Create a new instance of the Schema and save the values to it
      const newUser = new User({
        name: req.body.email,
        email: req.body.email,
        password: req.body.password
      });
      // Encrypting the password using bcrypt js
      // Generate a 10 character long salt
      bcrypt.genSalt(10, (error, salt) => {
        // Passing the salt to generate hash
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) {
            throw error;
          } else {
            // Swapping the values of the password with the newly generated hash
            newUser.password = hash;
            // Save the new user
            newUser
              .save()
              .then(user => {
                res.json(user);
              })
              .catch(error => {
                return res.json(error);
              });
          }
        });
      });
    }
  });
});

// ******************* ROUTE GOES HERE *******************

// @route POST /api/users/login
// @description Login User with passwort authentication
// @access Public
router.post("/login", (req, res) => {
  // Pull out the email and password from the request body
  const email = req.body.email;
  const password = req.body.password;

  // Search for the email in the database
  User.findOne({
    email: email
  })
    .then(user => {
      // If email address is not present, throw error to register user
      if (!user) {
        return res.status(403).json("Email address not found!");
      }
      // If the email address found, decrypt the password before proceeding using the bcrypt .compare function
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          // If the password matches
          if (isMatch) {
            // Create the payload for getting the Bearer tokens for authentication
            const payload = {
              name: user.name,
              id: user.id
            };

            // Sign the token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 4200
              },
              //callback as error and bearer token
              (error, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res.status(400).json("Incorrect password!");
          }
        })
        .catch(error => {
          return res.json(error);
        });
    })
    .catch(error => {
      return res.json(error);
    });
});

// ******************* ROUTE GOES HERE *******************

// @route GET /api/users/currentUser
// @description Checks for the current authenticated user details
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
