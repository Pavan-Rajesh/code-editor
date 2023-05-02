const express = require("express");
const router = express.Router();
require("../authentication/passport");
const allCodes = require("../models/allCodes");
const isAuth = require("../authentication/authMiddleWare").isAuth;

//here isAuth is a middleware that is responsible for authenticating a user
router.get("/", isAuth, (req, res) => {
  allCodes
    .find({})
    .populate("code")
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

router.post("/upvote", (req, res) => {
  const codeid = req.body.codeid;
  allCodes.find({ likedIds: req.user._id }).then((data) => {
    if (data.length == 0) {
      allCodes
        .findOneAndUpdate(
          { _id: codeid },
          {
            $inc: { upvotes: 1 },
          }
        )
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

router.post("/downvote", (req, res) => {
  const codeid = req.body.codeid;
  allCodes.find({ likedIds: req.user._id }).then((data) => {
    if (data.length == 0) {
      allCodes
        .findOneAndUpdate({ _id: codeid }, { $inc: { downvotes: 1 } })
        .then((data) => {
          // console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

module.exports = router;
