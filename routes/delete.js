const express = require("express");
const router = express.Router();
const python = require("../models/python");
const allcodes = require("../models/allCodes");
router.delete("/", (req, res) => {
  allcodes.deleteOne({ code: req.query.id }).then((data) => {
    // console.log(data);
    res.json("successfully deleted message");
  });
});

module.exports = router;
