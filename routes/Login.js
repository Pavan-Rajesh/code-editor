const express = require("express");
const router = express.Router();
require("../authentication/passport");
const passport = require("passport");

const isAuth = require("../authentication/authMiddleWare").isAuth;
router.get("/", (req, res) => {
  res.render("login");
});
//---------------------------------------------------------------------------------------
router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/wrongPassword",
    successRedirect: "/letscode",
  }),
  (req, res) => {
    console.log(req.body);
    res.send(ok);
  }
);
//------------------------------------------------------------------------------------------
router.get("/protected-route", isAuth, (req, res, next) => {
  res.send("You made it to the route.");
});
module.exports = router;
