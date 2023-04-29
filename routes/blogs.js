const express = require("express");
const router = express.Router();
require("../authentication/passport");
const allCodes = require("../models/allCodes");
const isAuth = require("../authentication/authMiddleWare").isAuth;

//here isAuth is a middleware that is responsible for authenticating a user
router.get("/", isAuth, (req, res) => {
  allCodes
    .find({})
    .then((data) => {
      // console.log(data);
      res.render("cards", {
        code: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
