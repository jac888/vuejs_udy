// @login and register
const express = require("express");
const router = express.Router();

// @Models / Profile
const Profile = require("../../models/Profile");

// @body-Parser
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// @jwt
const jwt = require("jsonwebtoken");

// @passport
const passport = require("passport");

// $route  GET /api/profiles/test
// @desc   返回請求的JSON
// @access Public

router.get("/test", (req, res) => {
  res.json({ profiles_route: "profile routing works!" });
});

// $route  POST /api/profiles/add
// @desc   新增
// @access Private

router.post(
  "/add",
  urlencodedParser,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileObj = {};
    if (req.body.type) profileObj.type = req.body.type;
    if (req.body.desc) profileObj.desc = req.body.desc;
    if (req.body.income) profileObj.income = req.body.income;
    if (req.body.expense) profileObj.expense = req.body.expense;
    if (req.body.cash) profileObj.cash = req.body.cash;
    if (req.body.remark) profileObj.remark = req.body.remark;

    new Profile(profileObj)
      .save()
      .then(profile => {
        res.json({ profile });
      })
      .catch(err => {
        console.log(err);
      });
  }
);

// $route  GET /api/profiles
// @desc   获取所有profile數據
// @access Private

router.get(
  "/",
  urlencodedParser,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find()
      .then(profile => {
        if (!profile) return res.status(404).json("没有任何内容");
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// $route  GET /api/profiles/id
// @desc   获取單一profile數據
// @access Private

router.get(
  "/:id",
  urlencodedParser,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ _id: req.params.id })
      .then(profile => {
        if (!profile) return res.status(404).json("没有任何内容");
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
