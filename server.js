const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

//routers
const usersRoute = require("./routers/api/user");
const profilesRoute = require("./routers/api/profile");

//DB Config
const db = require("./config/keys").mongoURI;
//Connect mongodb
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mlab connected!"))
  .catch(err => console.log("error: " + err));

//使用router
app.use("/api/user", usersRoute);
app.use("/api/profiles", profilesRoute);

//使用body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//possport
app.use(passport.initialize());
//passport config
require("./config/passport")(passport);

//設定
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server is running on port ＠" + port);
});
