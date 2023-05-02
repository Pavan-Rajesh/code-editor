const express = require("express");
const router = express.Router();
const allCodes = require("../models/allCodes");
const python = require("../models/python");
router.get("/", function (req, res) {
  console.log(req.query.id);
  allCodes
    .find({ code: req.query.id })
    .populate("code")
    .then((data) => {
      // console.log(data);
      const myarray = [
        "kotlin",
        "c_cpp",
        "python",
        "php",
        "java",
        "sql",
        "golang",
        "objectivec",
        "swift",
        "rust",
        "csharp",
      ];
      const selectedLanguage = data[0].code.language;
      languageArray = [];
      console.log(selectedLanguage);
      const index = myarray.indexOf(selectedLanguage);
      console.log(index);
      for (let i = 0; i < myarray.length; i++) {
        if (i == index) {
          languageArray.push("selected");
        } else {
          languageArray.push("");
        }
      }
      console.log(languageArray);
      const savedData = {
        code: data[0].code.code,
        markDown: data[0].code.markDown,
        language: languageArray,
        name: data[0].code.nameOfthecode,
      };
      // res.send("ok");
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
