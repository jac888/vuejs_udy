// @login and register
const express = require("express");
const router = express.Router();

// @Models / Profile
const Profile = require("../../models/Profile");

// @body-Parser
// const bodyParser = require("body-parser");
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

// @passport
const passport = require("passport");

// $route  GET /api/profiles/test
// @desc   返回請求的JSON
// @access Public

router.get("/test", (req, res) => {
  res.json({ profiles_route: "profile routing works!" });
});

module.exports = router;
