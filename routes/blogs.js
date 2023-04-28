const express = require("express");
const router = express.Router();
require("../authentication/passport");
const allCodes = require("../models/allCodes");
const isAuth = require("../authentication/authMiddleWare").isAuth;

//here isAuth is a middleware that is responsible for authenticating a user
router.get("/", isAuth, (req, res) => {
  res.render("cards", {
    // data: cards,
  });
});

module.exports = router;
