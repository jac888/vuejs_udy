const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

//使用body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routers
const usersRoute = require("./routers/api/user");
const profilesRoute = require("./routers/api/profile");
const apikeysRoute = require("./routers/api/apikey");

//DB Config
const db = require("./config/keys").mongoURI;

//Connect mongodb
mongoose
  .connect(
    db,
    { useCreateIndex: true, useNewUrlParser: true }
  )
  .then(() => console.log("Mlab connected!"))
  .catch(err => console.log("error: " + err));

//使用router
app.use("/api/user", usersRoute);
app.use("/api/profiles", profilesRoute);
app.use("/api/apikeys", apikeysRoute);

//possport
app.use(passport.initialize());
//passport config
require("./config/passport")(passport);

//設定
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server is running on port ＠" + port);
});
