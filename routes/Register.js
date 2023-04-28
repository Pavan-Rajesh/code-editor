const express = require("express");
const router = express.Router();
const passport = require("passport");
const genPassword = require("../authentication/utils/passportUtil").genPassword;
const User = require("../models/userLogin");
const isAuth = require("../authentication/authMiddleWare").isAuth;

// -----------------------------------------------------------------------------------------------

router.get("/", (req, res) => {
  res.render("register");
});

// -----------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------

router.post("/", (req, res) => {
  console.log(req.body);
  const saltHash = genPassword(req.body.registerPassword);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.name,
    hash: hash,
    salt: salt,
    admin: true,
  });

  newUser.save().then((user) => {
    console.log(user);
  });

  res.redirect("/login");
});
// -----------------------------------------------------------------------------------------------

module.exports = router;
