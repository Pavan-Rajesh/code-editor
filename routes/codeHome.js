const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("Home"); // views
});

// router.get("/second", (req, res) => {
//   res.send("second");
// });

module.exports = router;
