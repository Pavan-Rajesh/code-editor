const express = require("express");
const router = express.Router();
const allCodes = require("../models/allCodes");
router.get("/", (req, res) => {
  allCodes
    .find({ _id: req.query.id })
    .populate("code")
    .then((data) => {
      //   console.log(data);
      const savedData = {
        code: data[0].code.code,
        markDown: data[0].code.markDown,
        name: data[0].code.nameOfthecode,
      };
      res.render("codeEditorhome", {
        data: savedData,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
