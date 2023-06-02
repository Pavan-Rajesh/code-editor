const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
//------connecting to mongodb server
mongoose
  .connect(process.env.MONGODBURI)
  .then(() => {
    console.log("successfully connected");
  })
  .catch((err) => console.log(err));
const MongoStore = require("connect-mongo")(session);
//----------------------------------------------routes
// login route
const login = require("./routes/Login.js");
// register route
const register = require("./routes/Register.js");
//codeEditor route
const codeEditor = require("./routes/codeEditor.js");
//home route
const home = require("./routes/codeHome.js");
// blogs route
const blogs = require("./routes/blogs.js");
// logout route
const logout = require("./routes/logout.js");
// invalid login route
const invalidLogin = require("./routes/wrongPassword");
//user codes
const userCodes = require("./routes/userCodes");
//edit route
const edit = require("./routes/edit");
//delete route
const deleteCode = require("./routes/delete");
//view code route
const viewCode = require("./routes/viewcode");
// -------------------------------------------- end of routes

const app = express();
// middleware ----------------------------------------------------------------------!!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

//middleware ------------------------------------------------------------------------------------------------

//session store ----------------------------------------not used in here-------------------------------------------------------
const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: "sessions",
});
//session store -----------------------------------------------------------------------------------------------

//base routes ----------------------------------------------------------------

app.use(
  session({
    secret: "pavanrajesh",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: "session",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ------These should be all of the above ones

app.use("/", home);
app.use("/login", login);
app.use("/register", register);
app.use("/letscode", codeEditor);
app.use("/blogs", blogs);
app.use("/logout", logout);
app.use("/wrongPassword", invalidLogin);
app.use("/usercodes", userCodes);
app.use("/edit", edit);
app.use("/delete", deleteCode);
app.use("/view", viewCode);
//base routes ---------------------------------------------------------------- that means these routes will be preced by the double quoted strings in the above ones

// listening on port
app.listen(process.env.PORT || 3000, (err) => {
  if (err) throw err;
  console.log("listening on port 3000");
});
//port ----------------------------------------------------------------
