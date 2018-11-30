const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const usersRoute = require("./routers/api/user");

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

app.get("/", (req, res) => {
  res.send("hello world");
});

//使用router
app.use("/api/user", usersRoute);

//使用body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//設定
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server is running on port ＠" + port);
});
