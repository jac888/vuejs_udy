const express = require("express");
const router = express.Router();

// @Models / API
const APIKEY = require("../../models/APIKeys");

// @body-Parser
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// @jwt
const jwt = require("jsonwebtoken");

// @passport
const passport = require("passport");

// $route  GET /api/apikey/test
// @desc   返回請求的JSON
// @access Public

router.get("/test", (req, res) => {
  res.json({ profiles_route: "apikey routing works!" });
});

// $route  POST /api/apikey/add
// @desc   新增 APIKEY
// @access Private

router.post(
  "/add",
  urlencodedParser,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const apiObj = {};
    if (req.body.uid) apiObj.uid = req.body.uid;
    if (req.body.type) apiObj.type = req.body.type;
    if (req.body.desc) apiObj.exchange = req.body.exchange;
    if (req.body.income) apiObj.apikey = req.body.apikey;
    if (req.body.expense) apiObj.apisecret = req.body.apisecret;
    if (req.body.remark) apiObj.remark = req.body.remark;

    new APIKEY(apiObj)
      .save()
      .then(apikey => {
        res.json({ apikey });
      })
      .catch(err => {
        console.log(err);
      });
  }
);

// $route  GET /api/apikeys
// @desc   获取此使用者所有apikey
// @access Private
// 需要改
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

// $route  GET /api/apikey/id
// @desc   获取單一profile數據
// @access Private

router.get(
  "/:id",
  urlencodedParser,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    APIKEY.findOne({ _id: req.params.id })
      .then(apikey => {
        if (!apikey) return res.status(404).json("找不到ＡＰＩＫＥＹ！");
        res.json(apikey);
      })
      .catch(err => res.status(404).json(err));
  }
);

// $route  POST /api/apikey/add
// @desc   刪除
// @access Private
// below was edit need modification
router.post(
  "/edit/:id",
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

    Profile.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: profileObj },
      { new: true }
    ).then(profile => {
      res.json(profile);
    });
  }
);

module.exports = router;
