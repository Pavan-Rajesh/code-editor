const express = require("express");
const router = express.Router();
require("../authentication/passport");
const allCodes = require("../models/allCodes");
const isAuth = require("../authentication/authMiddleWare").isAuth;
const mongoose = require("mongoose");

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

// router.post("/upvote", (req, res) => {
//   const codeid = req.body.codeid;
//   // console.log(codeid);
//   allCodes.find({ _id: codeid }).then((data) => {
//     console.log(data);
//     console.log(codeid);

//     if (data.length == 0) {
//       allCodes
//         .findOneAndUpdate(
//           { _id: codeid },
//           {
//             $inc: { upvotes: 1 },
//             $push: { likedIds: req.user._id },
//           }
//         )
//         .then((data) => {
//           res.json("upvoted successfully");
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       res.json("you already voted");
//     }
//   });
// });
router.post("/upvote", (req, res) => {
  allCodes
    .aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(req.body.codeid) },
      },
      {
        $match: {
          likedIds: new mongoose.Types.ObjectId(req.user._id),
        },
      },
    ])
    .then((data, err) => {
      // console.log(data);
      if (data.length == 0) {
        allCodes
          .findOneAndUpdate(
            { _id: req.body.codeid },
            { $inc: { upvotes: 1 }, $push: { likedIds: req.user._id } }
          )
          .then((data) => {
            res.json("upvoted successfully");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.json("you already voted");
      }
    });
});
router.post("/downvote", (req, res) => {
  allCodes
    .aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(req.body.codeid) },
      },
      {
        $match: {
          dislikedIds: new mongoose.Types.ObjectId(req.user._id),
        },
      },
    ])
    .then((data, err) => {
      // console.log(data);
      if (data.length == 0) {
        allCodes
          .findOneAndUpdate(
            { _id: req.body.codeid },
            { $inc: { downvotes: 1 }, $push: { dislikedIds: req.user._id } }
          )
          .then((data) => {
            res.json("downvoted successfully");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.json("you already voted");
      }
    });
});

module.exports = router;
