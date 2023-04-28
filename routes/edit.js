const express = require("express");
const router = express.Router();
const allCodes = require("../models/allCodes");
const python = require("../models/python");
router.get("/", function (req, res) {
  console.log(req.query.id);
  python
    .find({ _id: req.query.id })
    .then((data) => {
      const savedData = {
        code: data[0].code,
        markDown: data[0].markDown,
      };
      res.render("codeEditorhome", {
        data: savedData,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", function (req, res) {
  console.log("this is edited");
  // console.log(req.query.id);
  // console.log(req.body.code, req.body.markdown);

  python
    .findOneAndUpdate(
      { _id: req.query.id },
      {
        code: req.body.code,
        markDown: req.body.markdown,
      }
    )
    .then((data) => {
      res.json("successfully updated");
    })
    .catch((err) => {
      console.log(err);
    });

  // python
  //   .find({ _id: req.query.id })
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

module.exports = router;
