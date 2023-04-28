const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const request = require("request");
require("../authentication/passport");
const python = require("../models/python");
const php = require("../models/php");
const allCodes = require("../models/allCodes.js");
const languagesJson = require("./languageCodes.json");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// isAuth is a middleware function that helps in authentication
const isAuth = require("../authentication/authMiddleWare").isAuth;

// if the user is authenticated only then the user will get the codeeditor
router.get("/", isAuth, (req, res) => {
  // console.log(req.user);
  const initialData = {
    code: "//initialcode",
    markDown: "## write your markdown here",
  };
  res.render("codeEditorhome", {
    data: initialData,
  }); //views
});

router.post("/", (req, res) => {
  const language = req.body.language;
  const code = req.body.code;
  console.log(languagesJson[language]);
  // only 200 requests are allowed for a free tier

  const program = {
    script: code,
    language: languagesJson[language],
    versionIndex: "0",
    clientId: "19bab97fe2db0c933dfa419e326fbb97",
    clientSecret:
      "5720b3591d5f88bc3f37ec7dbe8cc5dc1b01aabf6c83fb7a3e9ef0f4dcc0d9f0",
  };
  // console.log(program);
  // var program = {
  //   script: "print('hello')",
  //   language: "python3",
  //   versionIndex: "0",
  //   clientId: "19bab97fe2db0c933dfa419e326fbb97",
  //   clientSecret:
  //     "5720b3591d5f88bc3f37ec7dbe8cc5dc1b01aabf6c83fb7a3e9ef0f4dcc0d9f0",
  // };

  // sending request to the jdoodle to execute the written program by the user and the response is sent again back to the client here we are using the request and  the fetch is not defined yet in the jdoodle
  request(
    {
      url: "https://api.jdoodle.com/v1/execute",
      method: "POST",
      json: program,
    },
    function (error, response, body) {
      // console.log("error:", error);
      // console.log("statusCode:", response && response.statusCode);
      // we are sending the body to the client in the form of a JSON object
      res.json(body);
    }
  );
});

router.post("/save", (req, res) => {
  switch (req.body.language) {
    case "python":
      const newPython = new python({
        nameOfthecode: "let it be python",
        code: req.body.code,
        markDown: req.body.markdown,
        author: req.user._id,
      });
      const mixCodes = new allCodes({
        nameOfthecode: "let it be python",

        code: req.body.code,
        authorName: req.user.username,
        markDown: req.body.markdown,
        author: req.user._id,
      });
      mixCodes
        .save()
        .then((data) => {
          console.log("successfull saved");
        })
        .catch((error) => {
          console.log(err);
        });
      newPython
        .save()
        .then((data) => {
          console.log("successfully saved");
          res.json("successfully saved");
        })
        .catch((err) => {
          console.log(err);
        });

      break;
    case "php":
      const newPhp = new php({
        nameOfthecode: "let it be php",

        code: req.body.code,
        author: req.user._id,
      });
      newPhp
        .save()
        .then((data) => {
          res.json("successfully saved");
        })
        .catch((err) => {
          console.log(err);
        });
      break;
  }
});

//----------------------------------------------------------------

module.exports = router;
