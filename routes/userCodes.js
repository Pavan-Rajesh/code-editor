const express = require("express");
const router = express.Router();
const allCodes = require("../models/allCodes");
const python = require("../models/python");
router.get("/", (req, res) => {
  const userId = req.user._id;
  python
    .find({ author: userId })
    .then((data) => {
      res.render("userCode", {
        codes: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
