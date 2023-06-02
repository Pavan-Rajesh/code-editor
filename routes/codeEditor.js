const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const request = require("request");
require("../authentication/passport");
const python = require("../models/python");
const php = require("../models/php");
const allCodes = require("../models/allCodes.js");
const languagesJson = require("./languageCodes.json");
const kotlin = require("../models/kotlin.js");
const java = require("../models/java.js");
const sql = require("../models/sql.js");
const golang = require("../models/golang.js");
const csharp = require("../models/csharp.js");
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
  // console.log(languagesJson[language]);
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

router.post("/save", async (req, res) => {
  switch (req.body.language) {
    case "python":
      const newPython = new python({
        nameOfthecode: req.body.codeName,
        language: req.body.language,
        code: req.body.code,
        markDown: req.body.markdown,
        author: req.user._id,
      });
      const newCode = await newPython.save();
      const savedCodes = new allCodes({
        userId: req.user._id,
        code: newCode._id,
        upvotes: 0,
        downvotes: 0,
        docModel: req.body.language,
      });
      savedCodes.save();
      res.json("successfully saved");
      break;

    // python saving ends here php starts
    // -----------------------------------------
    case "php":
      const newPhp = new php({
        nameOfthecode: req.body.codeName,
        language: req.body.language,
        code: req.body.code,
        markDown: req.body.markdown,
        author: req.user._id,
      });
      const savephp = await newPhp.save();
      const allphp = new allCodes({
        userId: req.user._id,
        code: savephp._id,
        upvotes: 0,
        downvotes: 0,
        docModel: req.body.language,
      });
      allphp.save();
      res.json("successfully saved");
      break;
    case "kotlin":
      const newKotlin = new kotlin({
        nameOfthecode: req.body.codeName,
        language: req.body.language,
        code: req.body.code,
        markDown: req.body.markdown,
        author: req.user._id,
      });
      const savekotlin = await newKotlin.save();
      const allKotlin = new allCodes({
        userId: req.user._id,
        code: savekotlin._id,
        upvotes: 0,
        downvotes: 0,
        docModel: req.body.language,
      });
      allKotlin.save();
      res.json("successfully saved");
      break;
    case "java":
      const newJava = new java({
        nameOfthecode: req.body.codeName,
        language: req.body.language,
        code: req.body.code,
        markDown: req.body.markdown,
        author: req.user._id,
      });
      const savejava = await newJava.save();
      const alljava = new allCodes({
        userId: req.user._id,
        code: savejava._id,
        upvotes: 0,
        downvotes: 0,
        docModel: req.body.language,
      });
      alljava.save();
      res.json("successfully saved");
      break;
    case "sql":
      const newSql = new sql({
        nameOfthecode: req.body.codeName,
        language: req.body.language,
        code: req.body.code,

        markDown: req.body.markdown,
        author: req.user._id,
      });
      const savesql = await newSql.save();
      const allsql = new allCodes({
        userId: req.user._id,
        code: savesql._id,
        upvotes: 0,
        downvotes: 0,
        docModel: req.body.language,
      });
      allsql.save();
      res.json("successfully saved");
      break;
    case "golang":
      const newgoLang = new golang({
        nameOfthecode: req.body.codeName,
        language: req.body.language,
        code: req.body.code,
        markDown: req.body.markdown,
        author: req.user._id,
      });
      const savegolang = await newgoLang.save();
      const allgolang = new allCodes({
        userId: req.user._id,
        code: savegolang._id,
        upvotes: 0,
        downvotes: 0,
        docModel: req.body.language,
      });
      allgolang.save();
      res.json("successfully saved");
      break;
    case "csharp":
      const newcSharp = new csharp({
        nameOfthecode: req.body.codeName,
        language: req.body.language,
        code: req.body.code,
        markDown: req.body.markdown,
        author: req.user._id,
      });
      const savecsharp = await newcSharp.save();
      const allcsharp = new allCodes({
        userId: req.user._id,
        code: savecsharp._id,
        upvotes: 0,
        downvotes: 0,
        docModel: req.body.language,
      });
      allcsharp.save();
      res.json("successfully saved");
      break;
  }
});
//----------------------------------------------------------------
module.exports = router;
