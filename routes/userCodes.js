const express = require("express");
const router = express.Router();
const allCodes = require("../models/allCodes");
const python = require("../models/python");
router.get("/", (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  allCodes
    .find({ userId: req.user._id })
    .populate("code")
    // .find({ author: userId })
    .then((data) => {
      console.log(data);
      res.render("userCode", {
        codes: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
